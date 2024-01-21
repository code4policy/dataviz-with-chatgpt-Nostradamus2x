// Asynchronously fetch the data from the CSV file
d3.csv('http://localhost:8000/311-basic/311_boston_data.csv')
   .then(rawData => {
        // Convert 'Count' from string to number and sort data by 'Count'
        var data = rawData.map(d => {
            return {
                reason: d.reason,
                Count: +d.Count  // convert Count to number
            };
        }).sort((a, b) => b.Count - a.Count)  // sort by Count in descending order
          .slice(0, 10);  // keep only the top 10

        // Define dimensions and margins for the graph
        var margin = {top: 40, right: 20, bottom: 180, left: 100},
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // Create SVG container for the graph
        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Set the ranges for the scales
        var x = d3.scaleBand()
                  .range([0, width])
                  .padding(0.1);
        var y = d3.scaleLinear()
                  .range([height, 0]);

        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.reason; }));
        y.domain([0, d3.max(data, function(d) { return d.Count; })]);

        // Append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.reason); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.Count); })
            .attr("height", function(d) { return height - y(d.Count); });

        // Add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "rotate(-60)")
                .attr("text-anchor", "end")
                .style("font-size", "12px");

        // Add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add the text label for the Y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Count");

        svg.append("text")
            .attr("class", "graph-credit") // Add a class for styling if desired
            .attr("x", width / 2) // Position at the center of the graph
            .attr("y", height + margin.bottom - 10) // Position below the x-axis
            .style("text-anchor", "middle")
            .text("Graph by: Masato and Ayush");

        // Add the text label for the X axis
        svg.append("text")
            .attr("transform",
                  "translate(" + (width/2) + " ," +
                                 (height + margin.top + 80) + ")")
            .style("text-anchor", "middle")
            .text("Reason");
    })
    .catch(error => {
        console.error('Error fetching the data: ', error);
    });


// -----2nd graph-------

// This will store the full dataset
let allData = [];
let svg2, x2, y2, margin2, width2, height2;

// Load the data once and store it in allData
d3.csv('http://localhost:8000/Raw_File.csv').then(rawData => {
  // Store the data globally
  allData = rawData;

  // Extract unique neighborhoods for the dropdown
  let neighborhoods = Array.from(new Set(allData.map(d => d.neighborhood))).sort();
  
  // Populate the dropdown
  const dropdown = d3.select('#neighborhoodDropdown');
  dropdown.selectAll('option')
          .data(neighborhoods)
          .enter()
          .append('option')
          .text(d => d);

  // Now draw the initial bar chart
  drawBarChart(rawData);

  // Setup event listener for dropdown changes
  dropdown.on('change', function(event) {
    // Filter the data based on the selected neighborhood
    const selectedNeighborhood = d3.select(this).property('value');
    const filteredData = allData.filter(d => d.neighborhood === selectedNeighborhood);
    
    // Redraw the bar chart with the filtered data
    drawBarChart(filteredData);
  });

}).catch(error => {
  console.error('Error fetching the data: ', error);
});

function drawBarChart(data) {
  // Extract the subject data
  let subjectData = d3.rollup(data, v => v.length, d => d.subject);
  
  // Create a sorted array of subjects by number of calls
  let subjects = Array.from(subjectData, ([key, value]) => ({ key, value }))
                         .sort((a, b) => d3.descending(a.value, b.value))
                         .slice(0, 10);

  // Check if the SVG already exists
  if (!svg2) {
    // Define dimensions and margins for the graph
    margin2 = {top: 40, right: 20, bottom: 180, left: 100};
    width2 = 800 - margin2.left - margin2.right;
    height2 = 500 - margin2.top - margin2.bottom;

    // Create SVG container for the graph
    svg2 = d3.select("#neighborhood-chart-container").append("svg")
             .attr("width", width2 + margin2.left + margin2.right)
             .attr("height", height2 + margin2.top + margin2.bottom)
             .append("g")
             .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
  } else {
    // If it exists, clear the previous content
    svg2.selectAll("*").remove();
  }

  // Set the ranges for the scales
  x2 = d3.scaleBand()
         .range([0, width2])
         .padding(0.1);
  y2 = d3.scaleLinear()
         .range([height2, 0]);

  // Scale the range of the data in the domains
  x2.domain(subjects.map(function(d) { return d.key; }));
  y2.domain([0, d3.max(subjects, function(d) { return d.value; })]);

  // Append the rectangles for the bar chart
  svg2.selectAll(".bar")
      .data(subjects)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x2(d.key); })
      .attr("width", x2.bandwidth())
      .attr("y", function(d) { return y2(d.value); })
      .attr("height", function(d) { return height2 - y2(d.value); });

  // Add the x Axis
  svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2))
      .selectAll("text")
      .attr("transform", "rotate(-60)")
      .attr("text-anchor", "end")
      .style("font-size", "12px");

  // Add the y Axis
  svg2.append("g")
      .call(d3.axisLeft(y2));

  // Add the text label for the Y axis
  svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin2.left)
      .attr("x",0 - (height2 / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of 311 Calls");

  // Add the text label for the X axis
  svg2.append("text")
      .attr("transform",
            "translate(" + (width2/2) + " ," +
                           (height2 + margin2.top + 150) + ")")
      .style("text-anchor", "middle")
      .text("Subject");
}
