var svg = d3.select("svg");

var path = d3.geoPath();

var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-12, 0])
    .html(function(d) {
        return "<h4>" + d["State"] + "</h4>" + "<h4>" +"Individuals Affected: " + d["IndividualsAffected"] + "</h4>"
    }).style("fill", "red");

  const brechData = d3.csv("breaches.csv", function(data){
    

    var svg = d3.select("#map");
    svg.call(toolTip);
    var path = d3.geoPath();

    
    d3.json("https://d3js.org/us-10m.v1.json", function(us) {
      var stateCount = []

      for(var i = 0; i <data.length; i++){
          var currState = data[i]["State"]

          if(stateCount.includes(currState)){
              stateCount[currState] += data[i]["Individuals_Affected"]
          }
          else {
              stateCount[currState] = data[i]["Individuals_Affected"]
          }

      }

      var updatedStateCount = []

      for (const [key, value] of Object.entries(stateCount)){

          var colorGroup;
          if(value <= 1000) {
              colorGroup = 1
          } else if(value <= 10000) {
              colorGroup = 2
          } else if(value <= 25000) {
              colorGroup = 3
          } else if(value <= 45000) {
              colorGroup = 4
          } else {
              colorGroup = 5
          }

          var stateObj = {
              State:key, 
              IndividualsAffected: value, 
              colorGrp: colorGroup
          }

       updatedStateCount.push(stateObj)
      
      }

      // console.log(updatedStateCount)

      var color = d3.scaleLinear()
      .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67), rgb(87,123,76)"]);

      var legendText = ["Under 1000", "1000-10,000", "10,000+", "25,000+", "45,000+"];

      var colorScale = d3.scaleSequential()
      .domain([0, 5, 9])
      .interpolator(d3.interpolate("purple", "orange"));

      svg.append("g")
          .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path)
          

      svg.append("path")
          .attr("class", "state-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

      

        svg.selectAll("path")
          .data(updatedStateCount)
          
          .style("fill", function(d){
              var value = d.colorGrp
              console.log(value)
              if(value){
                  console.log(color(value))
                  return color(value)
              } else {
              return "rgb(255,0,217)"
              }
              
          }).on('mouseover', toolTip.show)
          .on('mouseout', toolTip.hide);
  

  })
})




