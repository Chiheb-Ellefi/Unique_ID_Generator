import re
from collections import defaultdict


with open("data.txt", 'r') as file:
    numbers = file.readlines()
ids = [number.strip() for number in numbers]
# Extract timestamps and count occurrences
timestamp_counts = defaultdict(int)

for id_str in ids:
    # Extract the 41-bit timestamp part (positions 2 to 12 in the string)
    timestamp = id_str[1:12]
    timestamp_counts[timestamp] += 1

# Print counts for each timestamp
for timestamp, count in timestamp_counts.items():
    print(f"Timestamp: {timestamp}, Count: {count}")

# Check if any timestamp exceeds the target rate of 1000 IDs per second
target_rate = 1000
timestamps_exceeding_target = {timestamp: count for timestamp, count in timestamp_counts.items() if count > target_rate}

# Print result
if timestamps_exceeding_target:
    print("Timestamps exceeding target rate of 1000 IDs per second:")
    for timestamp, count in timestamps_exceeding_target.items():
        print(f"Timestamp: {timestamp}, Count: {count}")
else:
    print("No timestamps exceed the target rate of 1000 IDs per second.")
