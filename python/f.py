import json
import random
import os
from datetime import datetime
import time
import numpy as np
import math
import cv2

def draw_path(image, path):
    color = (255, 255, 255)  # White color for drawing
    thickness = 2
    for i in range(len(path) - 1):
        cv2.line(image, tuple(path[i]), tuple(path[i + 1]), color, thickness)

def generate_random_json(directory, num_files=20, delay_ms=5):
    characters = [
                 
                 'Zari','Tyson','Simone','Kylie','Zendaya',
                 'Beiber','Monroe','Diamond','Oprah','Markle',
 
                 'bot','npc','anime','fantasia','westworld','PS3','wwe','neuron','silicon','gucci','prada',
                 'lion','tigress','synth','matrix','stranger','traffic', 'violent', 'PG','merch', 
                 'email', 'block', 'crypto', 'comp']

    print('Signing/....')

    for _ in range(num_files):
        session_id = int(datetime.timestamp(datetime.now()) * 1e6)
        drawing = {}

        for char in characters:
            num_paths = random.randint(1, 10)
            paths = []
            for _ in range(num_paths):
                path = []
                for _ in range(random.randint(1, 10)):
                    # Introduce correlation between x and y to create curved paths
                    x = int(math.floor(abs(np.random.normal(30, 330))))
                    y = int(math.floor(abs(np.random.normal(2, 150))))
                    path.append([x, y])

                # Add more curvature by smoothing the path
                smoothed_path = []
                for i in range(len(path) - 1):
                    x0, y0 = path[i]
                    x1, y1 = path[i + 1]
                    mid_x = (x0 + x1) // 2
                    mid_y = (y0 + y1) // 2
                    smoothed_path.extend([[x0, y0], [mid_x, mid_y]])

                smoothed_path.append(path[-1])
                paths.append(smoothed_path)

            drawing[char] = paths

        image_size = 250
        image = np.zeros((image_size, image_size, 3), dtype=np.uint8)

        for paths in drawing.values():
            for path in paths:
                draw_path(image, path)

        cv2.imshow("Drawing", image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        data = {
            "session": session_id,
            "drawings": drawing
        }

        filename = os.path.join(directory, f'{session_id}.json')

        with open(filename, 'w') as f:
            json.dump(data, f)

        time.sleep(delay_ms / 1000.0)

directory = r'C:\Projects\ML\data\raw'
generate_random_json(directory, delay_ms=5)
