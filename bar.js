// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var barsvg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./breach.csv").then(function (dataset) {

    // subgroups of headers
    //var subgroups = ["Hacking/IT Incident", "Improper Disposal", "Unauthorized Access/Disclosure"]
    var subgroups = dataset.columns.slice(2)
    console.log(typeof(subgroups));

    var groups = d3.map(dataset, function (d) { 
        return (d.State) 
    }).keys()

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#C7EFCF', '#FE5F55', '#EEF5DB'])

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (dataset)

    // x axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    barsvg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(0));

    // y axis  
    var y = d3.scaleLinear()
        .domain([0, 95000]) // d3.max(groups, d => d['Individuals_Affected']
        .range([height, 0]);
    barsvg.append("g")
        .call(d3.axisLeft(y));

    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    // tool tip functions
    var mouseover = function (d) {
        //var subgroupName = d3.select(this.parentNode).datum().key;
        //console.log(d3.select(this.parentNode).datum()[1]);
        var subgroupSelect = d.data.Type_of_Breach;
        // var subgroupType = d.data[d3.select(this.parentNode).datum().key].Type_of_Breach;
        var subgroupValue = d.data[d3.select(this.parentNode).datum().key];
        // console.log(d.data.Type_of_Breach);
        tooltip
            .html("Type of Breach: " + subgroupSelect + "<br>" + "Value: " + subgroupValue)
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        tooltip
            .style("left", (d3.mouse(this)[0] + 90) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
    }

    // Show the bars
    barsvg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function (d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("x", function (d) { console.log(d); return x(d.data.State); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .attr("stroke", "grey")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

})