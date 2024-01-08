// Load CSV data
d3.csv('311_boston_data.csv').then(data => {
    // Process the data
    data.forEach(d => {
        d.Count = +d.Count; // Convert Count to a number
    });

    // Sort the data by Count in descending order. first step to top 10
    data.sort((a, b) => b.Count - a.Count);

    // Take only the top 10 types
    const top10Data = data.slice(0, 10);

    // Set up SVG container
    const svgWidth = 800;
    const svgHeight = 500;
    const margin = { top: 40, right: 40, bottom: 80, left: 200 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select('#chart_311')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const yScale = d3.scaleBand()
        .domain(top10Data.map(d => d.reason))
        .range([0, height])
        .padding(0.2);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(top10Data, d => d.Count)])
        .range([0, width]);

    // Create bars
    svg.selectAll('rect')
        .data(top10Data)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', d => yScale(d.reason))
        .attr('width', d => xScale(d.Count))
        .attr('height', yScale.bandwidth())
        .attr('fill', 'blue')
        .on('mouseover', function (event, d) {
            d3.select(this).attr('fill', 'orange'); // Change color on hover
        })
        .on('mouseout', function () {
            d3.select(this).attr('fill', 'blue'); // Revert color on mouseout
        });

    // Add axes
    svg.append('g')
        .call(d3.axisLeft(yScale));

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add attribution line at the bottom
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.top + 20) // Adjust the y-coordinate for proper placement
        .attr('text-anchor', 'left')
        .style('font-size', '12px')
        .text('Chart created by Aarushi Sahejpal. Data source: Boston.gov');
});
