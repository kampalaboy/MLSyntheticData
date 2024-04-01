classes = {}

print('Shootas....')

def readCSV(filePath):

    with open(filePath, 'r') as f:
        lines = f.readlines()

        x = []
        y = []

        skip_rows = True  # Flag to skip rows until 'Zari' is encountered

        for i in range(1, len(lines)):
            row = lines[i].split(",")

            # Check if the label is 'Markle' to skip rows again
            if row[-1].strip() == 'Zari':
                skip_rows = False

            if not skip_rows:
                # Only consider the first 10 rows in each sample
                x.append([float(row[j]) for j in range(min(10, len(row) - 1))])

                # Check if the class is already in the dictionary, if not, add it
                class_label = row[-1].strip()
                if class_label not in classes:
                    classes[class_label] = len(classes)

                y.append(classes[class_label])

            # Check if the label is 'Zari' to start counting again
            
            if row[-1].strip() == 'Markle':
                skip_rows = True

    
    return (x, y)

from sklearn.neighbors import KNeighborsClassifier
knn=KNeighborsClassifier(
    n_neighbors=50,
    algorithm="brute",
    weights="uniform"
)

x,y = readCSV("../data/dataset/training.csv")

knn.fit(x,y)

x,y = readCSV("../data/dataset/testing.csv")

acc =(knn.score(x,y)) *100

# Print the number of training samples
print("Number of training samples:", len(x))

# Print the number of testing samples
print("Number of testing samples:", len(x))

for i in range(len(x)):
    print("Label:", list(classes.keys())[list(classes.values()).index(y[i])], x[i])

print('Shot Acc:',acc,'%')