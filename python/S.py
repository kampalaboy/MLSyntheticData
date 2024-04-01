import json
import random
import os
from datetime import datetime
import time
import numpy as np
import math

def generate_random_json(directory, num_files=50, delay_ms=5):
    characters = ['0','1','2','3','4','5','6','7','8','9',
                 '=','≠','≈','>','<','≥','≤','( )','[]','+',
                 '-','*','x','÷','/','√', '%', 'π','{ }', 
                 '|   |', 'f (x)', '∑', '!', '∫']

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
                    x = int(math.floor(abs(np.random.normal(0, 400))))
                    y = int(math.floor(abs(np.random.normal(0, 400))))
                    path.append([x, y])
                paths.append(path)
            drawing[char] = paths

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
