//Append a defs (for definition) element to your SVG
var defs = svg2.append("defs");

//Append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");
    
//Horizontal gradient
linearGradient
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%");
    
linearGradient.selectAll("stop")
    .data( myColor.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(myColor.range().length-1); })
    .attr("stop-color", function(d) { return d; });

var positioning = width2 + 100

svg2.append("rect")
    .attr("width", 30)
    .attr("height", height/3)
    .style("fill", "url(#linear-gradient)")
    .attr("transform", "translate(" + positioning + "," + mappad.top + ")")
    .attr("opacity", .8);

var colory = d3.scaleLinear()
    .domain([maxbar,minbar])
    .range([ 0, height/3])  

 svg2.append("g")
    .style("font-size", 25)
    .call(d3.axisLeft(colory).tickSize(4))
  //  .select(".domain").remove()
    .attr("transform", "translate(" + positioning + "," + mappad.top + ")")


