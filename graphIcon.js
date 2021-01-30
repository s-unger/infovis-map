// append icon image to div infoGraph
var graphInfoIcon = d3.select("#infoGraph");
graphInfoIcon.append('text')
  .style('font-family', 'Linearicons-Free')
  .attr('font-size', '20px' )
  .text('\ue87d')
  .attr('x',0)
  .attr('y',20)
  .attr("id", "graphIcon")
  .attr("fill","black");
//graphInfoIcon.append('image').attr("href", "./img/infoIcon.png").attr("id", "graphIcon").attr("width", "25px").attr("height", "25px");

// add event actions to icon image
var infoGraphIcon = document.getElementById("graphIcon");
infoGraphIcon.addEventListener("mouseover", showGraphInfo);
infoGraphIcon.addEventListener("mouseout", hideGraphInfo);

var graphDescr = document.getElementById("graphDescription");

// show info text for graph when mouseover
function showGraphInfo() {
  //graphInfoIcon.select("#graphIcon").style("opacity", "0.5");
  graphInfoIcon.select("#graphIcon").style("fill", "red");
  var graphIconPos = infoGraphIcon.getBoundingClientRect();
  graphDescr.style.left = (graphIconPos.left +40) + "px";
  graphDescr.style.top = (window.scrollY + graphIconPos.top - 17) + "px";
  graphDescr.style.display = "block";
}

// hide info text when mouseout
function hideGraphInfo() {
  //graphInfoIcon.select("#graphIcon").style("opacity", "1");
  graphInfoIcon.select("#graphIcon").style("fill", "black");
  graphDescr.style.display = "none";
}

