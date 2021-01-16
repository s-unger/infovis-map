var svgLegend = d3.select("#my_dataviz")

var description= "Interesse im zeitlichen Verlauf. Die Werte geben das Suchinteresse relativ zum höchsten Punkt im Diagramm für die ausgewählte Region im festgelegten Zeitraum an. ";

var mypopup = d3.select("#mypopup")


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


var myicon = document.getElementById("infoIcon");
var mypopup = document.getElementById("mypopup");

myicon.addEventListener("mouseover", showPopup);
myicon.addEventListener("mouseout", hidePopup);

function showPopup(evt) {
  svgLegend.select("#infoIcon").style("fill", "red");
  var iconPos = myicon.getBoundingClientRect();
  mypopup.style.left = (iconPos.left -420) + "px";
  mypopup.style.top = (window.scrollY + iconPos.top - 20) + "px";
  mypopup.style.display = "block";
}

function hidePopup(evt) {
  svgLegend.select("#infoIcon").style("fill", "black");
  mypopup.style.display = "none";
}

