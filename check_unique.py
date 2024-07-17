def check_unique_numbers(filename):
    with open(filename, 'r') as file:
        numbers = file.readlines()

  
    numbers = [number.strip() for number in numbers]

 
    unique_numbers = set(numbers)

  
    if len(unique_numbers) == len(numbers):
        return "All numbers are unique."
    else:
        return "There are duplicate numbers."

print("waiting for result...")

result = check_unique_numbers('data.txt')
print(result)
