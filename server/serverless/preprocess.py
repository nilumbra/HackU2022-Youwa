# import argparse
import sys
import time

# parser = argparse.ArgumentParser()
# parser.add_argument('--hello')
# args = parser.parse_args()

def main(lines):
    #time.sleep(1) # Simulate API call latency
    for i, line in enumerate(lines):
        print(f'{i}: {line}', flush=True)

if __name__ == '__main__':
    lines = []
    for l in sys.stdin:
        lines.append(l.rstrip('\r\n'))

    main(lines)