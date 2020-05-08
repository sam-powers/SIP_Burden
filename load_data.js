var burden_data;

function loadData() {
    
d3.csv("burden_data.csv")
    .then(
        function(data) {   
            burden_data = data;
            heat_bars(burden_data, "rank");           
        });   
}



