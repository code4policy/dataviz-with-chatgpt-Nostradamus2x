# Dataviz With GPT

<!-- Plan for today 

- Dataviz Principles (recap - slides) + Dataviz Rubric  
- Explore the data in R (w/ ChatGPT)
- ChatGPT D3 (below Part 1 and Part 2)


TODO: 

- Dhrumil will bring in slides from dataviz principles
- Dhrumil will make exploratory data viz (GPT 4 or python notebook)
- Aarushi will make part 1 (311-basic, 311-complex (with bonus))
- Aarushi materials to explain D3
- Dhrumil bring in the apple stock chart stuff (but use 311 data 2022)

-->

## Learning Objectives

Students will be able to:
- Use ChatGPT to build something in a programming language they're not familiar with (D3) #learning-how-to-learn

## Pre-requisites

This lesson assumes you are familiar with:
- Basic HTML, CSS and JavaScript
- Using GitHub

## Instructions

<!-- We demo some exploratory data analysis with ChatGPT and R -->
<!-- backup in python notebook just in case -->
https://data.boston.gov/dataset/311-service-requests


### Part 1: Build with GPT

Download data of all 311 calls in Boston from 2023
```
wget -O boston_311_2023.csv https://data.boston.gov/dataset/8048697b-ad64-4bfc-b090-ee00169f2323/resource/e6013a93-1321-4f2a-bf91-8d8a02f1e62f/download/tmpc0m94i5x.csv
```
### Part 1: Making stuff

Use your knowledge of the vocabulary of HTML, CSS and JS to prompt ChatGPT. Your goal is to, with it's help, make a D3 visualization of all of the 311 calls in Boston from 2023. 

1. Make a bar chart of the top 10 reasons for 311 calls in the past year (hint: use the `reason` column in the data)
2. The initial bar chart may not look quite right. With the help of ChatGPT, fix anything that looks immediately off (for example, sometimes the axis labels overlap or the bars are out of order etc...)
3. Give the bar chart a good headline and subheadline
4. Make the bar chart vertical instead of horizontal
5. Change the default colors, text size, or anything else
6. Add a citation for where the data comes from and give yourslves a chart authorship credit in the footnotes

Bonus: Go grab the raw csv, and create a bar chart that shows the top 10 departments `subject` by number of 311 calls and has a drop down menu for each name of the `neighborhood`

<!-- Debreif: Aarushi does it and shares -->
<!-- Submit to Prompt bank: fill out AI form -->

# Part 2: Analyze what we built

<!-- Students try to figure it out -->
<!-- Aarushi breaks down the code / mental models needed -->
    <!-- Talk about SVGs -->
    <!-- Select a part of the Body (remember CSS Selectors?) -->
<!-- Dhrumil brings in the stuff from the apple lesson (make 2 charts, not conflicting etc...learn about functions) -->

