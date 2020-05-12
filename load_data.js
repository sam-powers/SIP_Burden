var burden_data;

function loadData() {

initiateLeaflet();
    
    
d3.csv("burden_data.csv")
    .then(

        function(data) {   
            burden_data = data;
            loadVis(burden_data, "rank");
            

        });   
    
}

var bar_data;
var heatmap_data;

function loadVis(input_data, metric){
    
        
   heatmap_data = input_data.filter(function(el) {
    return el.Index === metric && el.Domain !== "index";})

    bar_data = input_data.filter(function(el) {
      return el.Index === metric && el.Domain === "index";})
    
    heat_bars(input_data, heatmap_data, bar_data);     
    
    colorLeaflet(bar_data);
    
}
