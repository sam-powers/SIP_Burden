var mycolumns;
var myrows;
var table_data;
var table_nested;

function  maketable(input_data, tract) {

table_data = input_data.filter(function(el) {
      return el.GEOID === tract; });

table_nested = d3.nest()
            .key(function(d){ return  d.Label})
           .entries(table_data)

    
   mycolumns = d3.map(table_data, function(d){return d.Stat;}).keys();
   var statistic = ["Statistic"]
   mycolumns = statistic.concat( mycolumns);
   myrows = d3.map(table_data, function(d){return d.Label;}).keys()

    var  tablebox = d3.selectAll(".tablecontent")
      tablebox.selectAll("table").remove()
    var table = tablebox.append("table").classed("table", true).classed("table-sm", false).attr("id", "tractfacts")


var tablehead = table.append("thead")
      .attr("class", "thead-light")
     .append("tr")
     .attr("class", "tablehead")
    
    
tablehead.selectAll("th")
       .data(mycolumns)
     .enter()
     .append("th")
     .attr("scope", "col")
     .text(function (d) {return d})
    
    
var tablebody = table.append("tbody")

var tablerows = tablebody.selectAll('tr')
         .data(table_nested)
         .enter()
         .append("tr")
         .attr("class", "table-hover")


var rowlabels = tablerows.append("th")
          .attr("scope", "row")
          .style("class", "rowtitles")
          .text(function(d) {return d.key})
    
    
var cellcontent = tablerows.selectAll("td")
         .data(function(d){return d.values.slice()})
         .enter()
         .append("td")
         .text(function(d) {return d.Value})
    

    
var header = d3.selectAll("#tableheader")
    


var tableheader = table_data[[0]]["NAME"]    
header.selectAll("h3")
      .text(function() {return  tableheader })
    
    
         //.text( function() {return  table_data[[0]]["CountyName"] })
         
         
    
};


var mycolumns2;
var myrows2;
var table_data2;
var table_nested2;

function  attributetable(input_data) {

table_data2 = input_data;

table_nested2 = d3.nest()
            .key(function(d){ return  d.Rows})
           .entries(table_data2)

    
mycolumns2 = d3.map(table_data2, function(d){return d.Columns;}).keys();
   var statistic = ["Quintiles:"]
   mycolumns2= statistic.concat( mycolumns2);
   myrows2 = d3.map(table_data2, function(d){return d.Rows;}).keys()

var  tablebox = d3.selectAll(".variables")
      tablebox.selectAll("table").remove()
var table = tablebox.append("table").classed("table", true).classed("table-sm", false).attr("id", "attributes")


var tablehead = table.append("thead")
      .attr("class", "thead-light")
     .append("tr")
     .attr("class", "tablehead")
    
    
tablehead.selectAll("th")
       .data(mycolumns2)
     .enter()
     .append("th")
     .attr("scope", "col")
     .text(function (d) {return d})
    
    
var tablebody = table.append("tbody")

var tablerows = tablebody.selectAll('tr')
         .data(table_nested2)
         .enter()
         .append("tr")
         .attr("class", "table-hover")


var rowlabels = tablerows.append("th")
          .attr("scope", "row")
          .style("class", "rowtitles")
          .text(function(d) {return d.key})
    
    
var cellcontent = tablerows.selectAll("td")
         .data(function(d){return d.values.slice()})
         .enter()
         .append("td")
         .text(function(d) {return d.values})
    
    
         //.text( function() {return  table_data[[0]]["CountyName"] })
         
         
    
};