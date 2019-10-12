// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


    d3.csv("data.csv", function(err, statedata) {
    if(err) throw err;

    statedata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
      });




  var xScale = d3.scaleLinear()
    .domain([8, d3.max(statedata, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([4, d3.max(statedata, d => d.smokes)])
    .range([height, 0]);


  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yLinearScale);



chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  

chartGroup.append("g")
    .call(leftAxis);

var circlesGroup = chartGroup.selectAll("circle")
    .data(statedata)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", 15)
    .attr("class", function(d) {
        return "stateCircle " + d.abbr;
      })
    .attr("fill", "purple")
    .attr("opacity", ".8")

var toolTip = d3.tip()
.attr("class", "tooltip")
.attr([1, -1])
.html(function(d) {
  return (`${d.abbr}`);
});



chartGroup.call(toolTip);

circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })

    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });




chartGroup.append("text")
    .attr("transform", `translate(${width / 3}, ${height + margin.top + 20})`)
    .text("Percentage of Population in Poverty");


    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height/1.2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Percentage of Population that Smokes");





});