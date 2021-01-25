// append icon image to div infoGraph
var graphInfoIcon = d3.select("#infoGraph");
graphInfoIcon.append('image').attr("href", "./img/infoIcon.png").attr("id", "graphIcon").attr("width", "20px").attr("height", "20px");

// add event actions to icon image
var infoGraphIcon = document.getElementById("graphIcon");
infoGraphIcon.addEventListener("mouseover", showGraphInfo);
infoGraphIcon.addEventListener("mouseout", hideGraphInfo);

var graphDescr = document.getElementById("graphDescription");

// show info text for graph when mouseover
function showGraphInfo() {
  graphInfoIcon.select("#graphIcon").style("opacity", "0.5");
  var graphIconPos = infoGraphIcon.getBoundingClientRect();
  graphDescr.style.left = (graphIconPos.left +40) + "px";
  graphDescr.style.top = (window.scrollY + graphIconPos.top - 17) + "px";
  graphDescr.style.display = "block";
}

// hide info text when mouseout
function hideGraphInfo() {
  graphInfoIcon.select("#graphIcon").style("opacity", "1");
  graphDescr.style.display = "none";
}

