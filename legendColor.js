var svgLegend = d3.select("#my_dataviz")


svgLegend.append("text").attr("x", 100).attr("y", 50).text("0%").style("font-size", "15px").attr("alignment-baseline","middle")
svgLegend.append("circle").attr("cx",140).attr("cy",50).attr("r", 8).style("fill", "#ffffcc")
svgLegend.append("circle").attr("cx",160).attr("cy",50).attr("r", 8).style("fill", "#ffefa5")
svgLegend.append("circle").attr("cx",180).attr("cy",50).attr("r", 8).style("fill", "#fedc7f")
svgLegend.append("circle").attr("cx",200).attr("cy",50).attr("r", 8).style("fill", "#febf5b")
svgLegend.append("circle").attr("cx",220).attr("cy",50).attr("r", 8).style("fill", "#fd9d43")
svgLegend.append("circle").attr("cx",240).attr("cy",50).attr("r", 8).style("fill", "#fc7034")
svgLegend.append("circle").attr("cx",260).attr("cy",50).attr("r", 8).style("fill", "#f23d26")
svgLegend.append("circle").attr("cx",280).attr("cy",50).attr("r", 8).style("fill", "#d91620")
svgLegend.append("circle").attr("cx",300).attr("cy",50).attr("r", 8).style("fill", "#b40325")
svgLegend.append("circle").attr("cx",320).attr("cy",50).attr("r", 8).style("fill", "#800026")
svgLegend.append("text").attr("x", 340).attr("y", 50).text("100%").style("font-size", "15px").attr("alignment-baseline","middle")
svgLegend.append('text')
   .style('font-family', 'Linearicons-Free')
   .attr('font-size', '23px' )
   .text('\ue87d')
   .attr('x',400)
   .attr('y',60)
   .attr("id", "infoIcon")
   .attr("fill","black");


var infoIcon = document.getElementById("infoIcon");
var popupLegend = document.getElementById("popupLegend");
var legendDescription= document.getElementById("legendDescription");

infoIcon.addEventListener("mouseover", showPopupLegend);
infoIcon.addEventListener("mouseout", hidePopupLegend);

function showPopupLegend() {
  svgLegend.select("#infoIcon").style("fill", "red");
  var iconPos = infoIcon.getBoundingClientRect();
  popupLegend.style.left = (iconPos.left -420) + "px";
  popupLegend.style.top = (window.scrollY + iconPos.top - 20) + "px";
  popupLegend.style.display = "block";
}

function hidePopupLegend() {
  //legendDescription.innerHTML = "whatever";
  svgLegend.select("#infoIcon").style("fill", "black");
  popupLegend.style.display = "none";
}

