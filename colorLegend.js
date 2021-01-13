addTheLegend();
function addTheLegend() {
  var svgLegend = d3.select("#my_legend");


        // Color legend.
        var colorScale = d3.scale.quantize()
          .domain([ 0, 100 ])
          .range(["#ffffcc","#ffefa5","#fedc7f","#febf5b","#fd9d43","#fc7034","#f23d26","#d91620","#b40325","#800026"]);

        var colorLegend = d3.legend.color()
          .labelFormat(d3.format(".0f"))
          .scale(colorScale)
          .shapePadding(10)
          .shapeWidth(50)
          .shapeHeight(20)
          .labelOffset(12);

          colorLegend.orient("horizontal");
      
          

        svgLegend.append("g")
          .attr("transform", "translate(352, 60)")
          .call(colorLegend);

        var data = [3,8,5,2,8,9,2];


       

        
        /*svgLegend.selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
        	.attr("r", function(d,i){return d * 2.5})
          .attr("cx", function(d,i){return i * 50 + 30})
          .attr("cy", 100)
          .attr("fill", function(d,i){return colorScale(d)});*/
}
