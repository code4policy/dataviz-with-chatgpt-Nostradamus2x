#!/usr/bin/env python3

import pandas as pd

# Read the CSV file into a pandas DataFrame
data = pd.read_csv('boston_311_2023.csv')

# Group the data by the 'reason' column and count the occurrences of each reason
reason_counts = data.groupby('reason').size().reset_index(name='Count')

# Save the result to a new CSV file
reason_counts.to_csv('boston_311_2023_by_reason.csv', index=False)

# Print the result (optional)
print(reason_counts)
