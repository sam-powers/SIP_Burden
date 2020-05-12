// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
    
    d3.select("#tooltip")
      .style("visibility","visible");
    
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
    
    
  var id = d3.select(this).attr("id"); 
      id = id.substring(1, id.length);
  
    d3.select("#indicatorname").text( d.Label)
    d3.select("#valuetype").text(d.CountyName  + ": ")
    d3.select("#value").text( d.Number)

/// Dim all    
d3.selectAll(".tractshapes").transition().duration(750)
.style("opacity", .2)
/// Highlight the Row    
var highlightid = "#T" + id;   
d3.selectAll(highlightid).transition().duration(750)
.style("opacity", 1)    
     
  }


var mousemove = function(d) {
    
    d3.select("#tooltip")
      .style("left", d3.event.pageX -60  + "px")
      .style("top", d3.event.pageY -75 + "px")

  }
  
  var mouseleave = function(d) {
  d3.select("#tooltip")
      .style("visibility","hidden");
      
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
      
  d3.selectAll(".tractshapes").transition().duration(750)
.style("opacity", .8)

  }
  
  

// Three function that change the tooltip when user hover / move / leave a cell

var mouseovermap = function(d) {
    
    
    d3.select("#tooltip")
      .style("visibility","visible");
    
    d3.select(this)
      .style("stroke", "black");
    
var id = d3.select(this).attr("id"); 
    
     id = id.substring(1, id.length);
        
var tooltip_data = bar_data.filter(function(el) {
         return el.GEOID === id ;})

    
function modify_tooltip(d)    {    
    d3.select("#indicatorname").text( d.Label)
   d3.select("#valuetype").text(d.CountyName  + ": ")
    d3.select("#value").text( d.Number)
 }
    
modify_tooltip(tooltip_data[[0]]);

/// Dim all    
d3.selectAll(".rectangle").transition().duration(750)
.style("opacity", .2)
/// Highlight the Row    
var highlightid = "#A" + id;   
d3.selectAll(highlightid).transition().duration(750)
.style("opacity", 1)    
    
    
}


var mousemovemap = function(d) {
    
    d3.select("#tooltip")
      .style("left", d3.event.pageX -60  + "px")
      .style("top", d3.event.pageY -75 + "px")
      

  }
  
  var mouseleavemap = function(d) {
  d3.select("#tooltip")
      .style("visibility","hidden");
      
    d3.select(this)
      .style("stroke", "white")
      
      d3.selectAll(".rectangle").transition().duration(750).style("opacity", .8)

  }