
var heatmap_data;
var myGroups;
var myVars;
var bar_data;
var maxnumber;

function heat_bars(input_data, metric) {

var svg = d3.selectAll("g").remove()
    
heatmap_data = input_data.filter(function(el) {
    return el.Index === metric && el.Domain !== "index";})
    
maxnumber = d3.max(heatmap_data, function(d) {return d.Number;}) 
var minnumber = d3.min(heatmap_data, function(d) {return d.Number;}) 

    
myGroups = d3.map(input_data, function(d){return d.Domain;}).keys();
myVars = d3.map(heatmap_data, function(d){return d.GEOID;}).keys()
    
var margin = {top: 100, right: 25, bottom: 30, left: 200},
  width = 550 - margin.left - margin.right,
  mappad = {top: 100},
  height = 2000 - margin.top - margin.bottom - mappad.top;
    
var svg = d3.select("#projectscontainer")
   .append("g")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");    
    
// Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
    
  svg.append("g")
    .style("font-size", 25)
    .attr("transform", "translate(0," + mappad.top + ")")
    .call(d3.axisTop(x).tickSize(0))
        .selectAll('text')
        .attr('font-weight', 'normal')
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        .attr("transform", function (d) {
            return "rotate(-65)";
        })
        .select(".domain")
       .remove();
    
// Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
    
  svg.append("g")
    .style("font-size", 25)
    .attr("transform", "translate(0," + mappad.top + ")")
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()
    
    
var interpolateDomain1 = d3.interpolateNumber(minnumber, maxnumber);

var myColor = d3.scaleLinear()
    .range(["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c",
            "#f9d057","#f29e2e","#e76818","#d7191c"])
     .domain([interpolateDomain1(0), 
              interpolateDomain1(0.1), 
              interpolateDomain1(0.2), 
              interpolateDomain1(0.3), 
              interpolateDomain1(0.4),
             interpolateDomain1(0.5),
             interpolateDomain1(0.6),
             interpolateDomain1(0.7),
             interpolateDomain1(0.8),
             interpolateDomain1(0.9),
             interpolateDomain1(1.0)]);
 
  

  
   // Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
    d3.select("#tooltip")
      .style("visibility","visible");
    
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }


  var mousemove = function(d) {
    d3.select("#tooltip")
      .style("left", d3.event.pageX -60  + "px")
      .style("top", d3.event.pageY -75 + "px")
      
    d3.select("#indicatorname").text( d.Domain)
    d3.select("#valuetype").text( d.Index + ": ")
    d3.select("#value").text( d.Number)

  }
  
  var mouseleave = function(d) {
  d3.select("#tooltip")
      .style("visibility","hidden");
      
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }
  
// add the squares
  svg.selectAll()
    .data(heatmap_data, function(d) {return d.Domain+':'+d.GEOID;})
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.Domain) })
      .attr("y", function(d) { return y(d.GEOID) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) { return myColor(d.Number)} )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .attr("transform", "translate(0," + mappad.top + ")")


// Add title to graph
svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "55px")
        .text("Shelter In Place Burden");

// Add subtitle to graph
//svg.append("text")
//        .attr("x", 0)
//        .attr("y", -30)
//        .attr("text-anchor", "left")
//        .style("font-size", "20px")
//        .style("fill", "grey")
//        .style("max-width", 200)
//        .text("A short description of the take-away message of this chart.");

    
    
    
    
    

// Start Making the Bar Graph Here:
bar_data = input_data.filter(function(el) {
    return el.Index === metric && el.Domain === "index";})
    

    
var maxbar = d3.max(bar_data, function(d) {return d.Number;}) 

var minbar = d3.min(bar_data, function(d) {return d.Number;}) 
  
var interpolateDomain = d3.interpolateNumber(minbar, maxbar);

var myColorBar = d3.scaleLinear()
    .range(["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c",
            "#f9d057","#f29e2e","#e76818","#d7191c"])
     .domain([interpolateDomain(0), 
              interpolateDomain(0.1), 
              interpolateDomain(0.2), 
              interpolateDomain(0.3), 
              interpolateDomain(0.4),
             interpolateDomain(0.5),
             interpolateDomain(0.6),
             interpolateDomain(0.7),
             interpolateDomain(0.8),
             interpolateDomain(0.9),
             interpolateDomain(1.0)]);

var margin_bar = {top: margin.top, right: 30, bottom: margin.bottom, left: 10},
    width2 = 500 - margin_bar.left - margin_bar.right,
    offset = margin.left + width - 50;             //Calculate the end of the heat map
  
    
    
// append the svg object to the body of the page
var svg2 = d3.select("#projectscontainer")
   .append("g")
     .attr("width2", width + margin_bar.left + margin_bar.right)
     .attr("height", height + margin_bar.top + margin_bar.bottom)
     .attr("transform",
        "translate(" + offset + "," + 0 + ")")
    .append("g")
      .attr("transform",
        "translate(" + margin_bar.left + "," + margin_bar.top + ")");   

// Build X scales and axis:
  var x2 = d3.scaleLinear()
    .domain([0, maxbar])
    .range([ 0, width2]);
    
//  svg2.append("g")
//    .attr("transform", "translate(0," + height + ")")
//    .call(d3.axisBottom(x2))
//    .selectAll("text")
//      .attr("transform", "translate(-10,0)rotate(-45)")
//      .style("text-anchor", "end");

// Build Y scales and axis:
// The Y scale is already built from before.   
//  svg2.append("g")
//    .style("font-size", 25)
//    .call(d3.axisLeft(y).tickSize(0))
//    .select(".domain").remove()
    
//Bars
  svg2.selectAll("myRect")
    .data(bar_data)
    .enter()
    .append("rect")
    .attr("x", x2(0) )
    .attr("y", function(d) { return y(d.GEOID); })
    .attr("width", function(d) { return x2(d.Number); })
    .attr("height", y.bandwidth() )
    .attr("fill", function(d){ return myColorBar(d.Number)})
        .attr("transform", "translate(0," + mappad.top + ")")
    .attr("opacity", .8)
        .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

    
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
    
svg2.append("rect")
    .attr("width", 30)
    .attr("height", height/3)
    .style("fill", "url(#linear-gradient)")
    .attr("transform", "translate(" + width2 + "," + mappad.top + ")")
    .attr("opacity", .8);

var colory = d3.scaleLinear()
    .domain([maxbar,minbar])
    .range([ 0, height/3])  
 
 svg2.append("g")
    .style("font-size", 25)
    .call(d3.axisLeft(colory).tickSize(0))
  //  .select(".domain").remove()
    .attr("transform", "translate(" + width2 + "," + mappad.top + ")")



     
}






