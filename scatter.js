
// Global function called when select element is changed
function onTypeChanged() {
    let radioInput = d3.select('input[name="type"]:checked').property("value");
    console.log(radioInput)
    // Update chart with the selected category of letters
    update(radioInput);
}
 
 // set the dimensions and margins of the graph
 var margin = {top: 10, right: 30, bottom: 30, left: 60},
     width = 460 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;
 
 // append the svg object to the body of the page
 var scattersvg = d3.select("#scatter-chart")
   .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
   .append("g")
     .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");
 
 // Initialise a X axis:
 var x = d3.scaleTime().range([0,width]);
 var xAxis = d3.axisBottom().scale(x);
 scattersvg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .attr("class","myXaxis")
 
 // Initialize an Y axis
 var y = d3.scaleLinear().range([height, 0]);
 var yAxis = d3.axisLeft().scale(y);
 scattersvg.append("g")
   .attr("class","myYaxis")
 
  scattersvg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height - margin.bottom)
    .text("Year");

  scattersvg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Individuals Affected");

   // Load the data 
d3.csv("./breaches.csv").then(function(dataset) {
    typesData = dataset;
})

 // Create a function that takes a dataset as input and update the plot:
 function update(type) {
 
    // Filter data 
    var filteredData = typesData.filter(function(d) {
        return d.Type_of_Breach == type
    })

   // Create the X axis:
   x.domain([0, d3.max(filteredData, function(d) { 
       return Date.parse(d.breach_start) }) ]);
   scattersvg.selectAll(".myXaxis").transition()
     .duration(3000)
     .call(xAxis);
 
   // create the Y axis
   y.domain([0, d3.max(filteredData, function(d) { 
       console.log(d.Individuals_Affected)
       return parseInt(d.Individuals_Affected) }) ]);
   scattersvg.selectAll(".myYaxis")
     .transition()
     .duration(3000)
     .call(yAxis);

     let circles = scattersvg.selectAll("circle").data(filteredData, function (d) {
        return Date.parse(d.breach_start);
    });

    circles.exit().remove();

    //UPDATE existing elements to new position in graph:
    circles
    .attr("cy", function (d) {
    return y(parseInt(d.Individuals_Affected));
    })
    .attr("cx", function (d) {
    return x(Date.parse(d.breach_start));
    });

    circles
        .enter()
        .append("circle")
    .attr("class", "enter")
    .attr("fill", "blue")
    .attr("cy", function (d) {
        return y(parseInt(d.Individuals_Affected));
    })
    .attr("cx", function (d) {
    return x(Date.parse(d.breach_start))
    })
    .attr("r", 5);

}
 