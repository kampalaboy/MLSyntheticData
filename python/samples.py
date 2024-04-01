import json
import random
import os
from datetime import datetime
import time

def generate_random_json(directory, num_files=100, delay_ms=5):
    characters = ['0','1','2','3','4','5','6','7','8','9',
                 '=','≠','≈','>','<','≥','≤','( )','[]','+',
                 '-','*','x','÷','/','√', '%', 'π','{ }', 
                 '|   |', 'f (x)', '∑', '!', '∫']

    print('Sampler/....')

    for _ in range(num_files):
        session_id = int(datetime.timestamp(datetime.now()) * 1e6)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        color = '#%06X' % random.randint(0, 0xFFFFFF) # Generate a random color
        drawing = {}

        for _ in range(random.randint(1, len(characters))):
            char = random.choice(characters)
            num_paths = random.randint(1, 10)
            paths = []
            for _ in range(num_paths):
                path = []
                for _ in range(random.randint(1, 100)):
                    x = random.randint(1, 100)
                    y = random.randint(1, 100)
                    path.append([x, y])
                paths.append(path)
            drawing[char] = paths

        data = {
            "session": session_id,
            "timestamp": timestamp,
            "color": color,
            "drawings": drawing
        }

        filename = os.path.join(directory, f'{session_id}.json')

        with open(filename, 'w') as f:
            json.dump(data, f)

        time.sleep(delay_ms / 1000.0)

directory = r'C:\Projects\ML\data\raw'
generate_random_json(directory, delay_ms=5)
