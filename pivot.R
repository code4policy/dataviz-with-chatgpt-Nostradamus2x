#!/usr/bin/env Rscript

# Load the necessary libraries
library(dplyr)

# Read the CSV file into a data frame
data <- read.csv('boston_311_2023.csv', header = TRUE)

# Group the data by the 'reason' column and count the occurrences of each reason
reason_counts <- data %>%
  group_by(reason) %>%
  summarise(Count = n())

# Print the result (optional)
print(reason_counts)

# Save the result to a new CSV file
write.csv(reason_counts, file = 'boston_311_2023_by_reason.csv', row.names = FALSE)
