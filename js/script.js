
//Draw the Circle


var data = [2,2,2,2,2,2,2,2];

// tree-ify our fake data
var dataTree = {
    children: data.map(function(d) { return { size: d }; })
};

// basic settings
var w = 500,
    h = 500,
    maxRadius = 75;


// size scale for data
var radiusScale = d3.scale.sqrt().domain([0, d3.max(data)]).range([0, maxRadius]);

// determine the appropriate radius for the circle
var roughCircumference = d3.sum(data.map(radiusScale)) * 2,
    radius = roughCircumference / (Math.PI * 2);

// make a radial tree layout
var tree = d3.layout.tree()
    .size([360, radius])
    .separation(function(a, b) {
        return radiusScale(a.size) + radiusScale(b.size);
    });

// make the svg
var svg = d3.select("body").append("svg")
    .attr("width", w )
    .attr("height", h )
    .append("g")
    .attr("transform", "translate(" + (w / 2 ) + "," + (h /2) + ")");

var c = svg.append('circle').attr({r:75})
var r = 175;
// apply the layout to the data
var nodes = tree.nodes(dataTree);

// create dom elements for the node
var node = svg.selectAll(".node")
      .data(nodes.slice(1)) // cut out the root node, we don't need it
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d,i) {
          return "translate(" + (r * Math.sin(Math.PI * i * 0.25)) + "," + (r * Math.cos(Math.PI * i * 0.25)) + ")";
      })

node.append("rect")
    .attr({
    width: 30,
    height:30,
    fill : 'gray',
    "transform":function(d) {
         return "translate(" +(-12.5)+ ","+ (-12.5) + ")";
      }
});

// node.select("rect")
//       .attr({
//         fill:'red'
//       })

d3.selectAll(".node").on("click", function () {
  // var activeClass = "active";
  // var alreadyIsActive = d3.select(this).classed(activeClass);
  // svg.selectAll(".reports-chart__bar")
  //   .classed(activeClass, false);
  // d3.select(this).classed(activeClass, !alreadyIsActive);
  console.log("Clicked")
});
