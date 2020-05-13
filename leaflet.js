function initiateLeaflet() {
     
var map = L.map('map').setView([38.000, -78.4767], 9); // Center it at Charlottesville to start
    
  L.tileLayer.provider('CartoDB.Voyager').addTo(map);    // Create the base layers 
    
  function style(feature) {
     return {
        weight: 2,
        opacity: .8,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
         };
       }
    
var geoJsonLayer = L.geoJson(tractsData, {style: style}).addTo(map);  

geoJsonLayer.eachLayer(function (layer) {
    layer._path.id = "T" + layer.feature.properties.GEOID;
});
    
var svgLayer = d3.selectAll("#map").select("svg");
var tractg = svgLayer.select('g').attr("id", "tractlayers").attr("class", "leaflet-zoom-hide");
var tractshapes = tractg.selectAll("path")
             .on("mouseover", mouseovermap)
             .on("mousemove", mousemovemap)
             .on("mouseleave", mouseleavemap)
            .attr("class", "tractshapes");     
}


function colorLeaflet(map_data){
    
var maxbar = d3.max(map_data, function(d) {return d.Number;}) 

var minbar = d3.min(map_data, function(d) {return d.Number;}) 
  
var interpolateDomain = d3.interpolateNumber(minbar, maxbar);

var myColorBar = d3.scaleLinear()
    .range(["#E5E419FF", "#97D83FFF", "#53C569FF", "#25AC82FF", "#21908CFF", "#2B748EFF", "#38578CFF", "#453581FF", "#471063FF"])

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
             interpolateDomain(1.0)])


map_data.forEach(function(d) {
                
        var tract = d["GEOID"];
    
           d3.select("#T" + tract).transition().duration(1000)
                    .style("fill", myColorBar(d["Number"]))
               ;             
           });
    
}