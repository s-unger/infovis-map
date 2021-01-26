var svgLegend = d3.select("#my_dataviz")


svgLegend.append("text").attr("x", 80).attr("y", 38).text("0%").style("font-size", "15px").attr("alignment-baseline","middle")
svgLegend.append("circle").attr("cx",120).attr("cy",38).attr("r", 7).attr("id", "bubble1").style("fill", "#ffffcc");
svgLegend.append("circle").attr("cx",140).attr("cy",38).attr("r", 7).attr("id", "bubble2").style("fill", "#ffefa5")
svgLegend.append("circle").attr("cx",160).attr("cy",38).attr("r", 7).attr("id", "bubble3").style("fill", "#fedc7f")
svgLegend.append("circle").attr("cx",180).attr("cy",38).attr("r", 7).attr("id", "bubble4").style("fill", "#febf5b")
svgLegend.append("circle").attr("cx",200).attr("cy",38).attr("r", 7).attr("id", "bubble5").style("fill", "#fd9d43")
svgLegend.append("circle").attr("cx",220).attr("cy",38).attr("r", 7).attr("id", "bubble6").style("fill", "#fc7034")
svgLegend.append("circle").attr("cx",240).attr("cy",38).attr("r", 7).attr("id", "bubble7").style("fill", "#f23d26")
svgLegend.append("circle").attr("cx",260).attr("cy",38).attr("r", 7).attr("id", "bubble8").style("fill", "#d91620")
svgLegend.append("circle").attr("cx",280).attr("cy",38).attr("r", 7).attr("id", "bubble9").style("fill", "#b40325")
svgLegend.append("circle").attr("cx",300).attr("cy",38).attr("r", 7).attr("id", "bubble10").style("fill", "#800026")
svgLegend.append("text").attr("x", 320).attr("y", 38).text("100%").style("font-size", "15px").attr("alignment-baseline","middle")
svgLegend.append('text')
   .style('font-family', 'Linearicons-Free')
   .attr('font-size', '20px' )
   .text('\ue87d')
   .attr('x',380)
   .attr('y',44)
   .attr("id", "infoIcon")
   .attr("fill","black");


var infoIcon = document.getElementById("infoIcon");
var popupLegend = document.getElementById("popupLegend");
var legendDescription= document.getElementById("legendDescription");
var popUpPercentages= document.getElementById("popupPercentages");
var percentageBubbleText= document.getElementById("percentageBubbleText");
var bubble1= document.getElementById("bubble1"); 
var bubble2= document.getElementById("bubble2");
var bubble3= document.getElementById("bubble3"); 
var bubble4= document.getElementById("bubble4");
var bubble5= document.getElementById("bubble5");
var bubble6= document.getElementById("bubble6");
var bubble7= document.getElementById("bubble7");
var bubble8= document.getElementById("bubble8");
var bubble9= document.getElementById("bubble9");
var bubble10= document.getElementById("bubble10");
var currentHoveredBubble=null;




infoIcon.addEventListener("mouseover", showPopupLegend);
infoIcon.addEventListener("mouseout", hidePopupLegend);
bubble1.addEventListener("mouseover", showPopupPercentages);
bubble2.addEventListener("mouseover", showPopupPercentages);
bubble3.addEventListener("mouseover", showPopupPercentages);
bubble4.addEventListener("mouseover", showPopupPercentages);
bubble5.addEventListener("mouseover", showPopupPercentages);
bubble6.addEventListener("mouseover", showPopupPercentages);
bubble7.addEventListener("mouseover", showPopupPercentages);
bubble8.addEventListener("mouseover", showPopupPercentages);
bubble9.addEventListener("mouseover", showPopupPercentages);
bubble10.addEventListener("mouseover", showPopupPercentages);

bubble1.addEventListener("mouseout", hidePopupPercentages);
bubble2.addEventListener("mouseout", hidePopupPercentages);
bubble3.addEventListener("mouseout", hidePopupPercentages);
bubble4.addEventListener("mouseout", hidePopupPercentages);
bubble5.addEventListener("mouseout", hidePopupPercentages);
bubble6.addEventListener("mouseout", hidePopupPercentages);
bubble7.addEventListener("mouseout", hidePopupPercentages);
bubble8.addEventListener("mouseout", hidePopupPercentages);
bubble9.addEventListener("mouseout", hidePopupPercentages);
bubble10.addEventListener("mouseout", hidePopupPercentages);


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

function showPopupPercentages(d){
  var circleId= d.srcElement.id;
  console.log("HOVER BUBBLE");
  
  //console.log(d);
  //console.log(circleId);
  if (circleId=="bubble1"){
    var iconPos = bubble1.getBoundingClientRect();
    currentHoveredBubble=bubble1;
    popUpPercentages.innerHTML="< 10";
  }
  if (circleId=="bubble2"){
   popUpPercentages.innerHTML="< 20 <br /> >= 10";
    var iconPos = bubble2.getBoundingClientRect();
    currentHoveredBubble=bubble2;
   
  }
  if (circleId=="bubble3"){
    var iconPos = bubble3.getBoundingClientRect();
    currentHoveredBubble=bubble3;
    popUpPercentages.innerHTML="< 30 <br /> >= 20";
  }
  
  if (circleId=="bubble4"){
    var iconPos = bubble4.getBoundingClientRect();
    currentHoveredBubble=bubble4;
    popUpPercentages.innerHTML="< 40 <br /> >= 30";
  }
  if (circleId=="bubble5"){
    var iconPos = bubble5.getBoundingClientRect();
    currentHoveredBubble=bubble5;
    popUpPercentages.innerHTML="< 50 <br /> >= 40";
  }
  if (circleId=="bubble6"){
    var iconPos = bubble6.getBoundingClientRect();
    currentHoveredBubble=bubble6;
    popUpPercentages.innerHTML="< 60 <br /> >= 50";
  }
  if (circleId=="bubble7"){
    var iconPos = bubble7.getBoundingClientRect();
    currentHoveredBubble=bubble7;
    popUpPercentages.innerHTML="< 70 <br />>= 60";
  }
  if (circleId=="bubble8"){
    var iconPos = bubble8.getBoundingClientRect();
    currentHoveredBubble=bubble8;
    popUpPercentages.innerHTML="< 80 <br />>= 70";
  }
  if (circleId=="bubble9"){
    var iconPos = bubble9.getBoundingClientRect();
    currentHoveredBubble=bubble9;
    popUpPercentages.innerHTML="< 90 <br />>= 80";
  }
  if (circleId=="bubble10"){
    var iconPos = bubble10.getBoundingClientRect();
    currentHoveredBubble=bubble10;
    popUpPercentages.innerHTML="<= 100 <br />>= 90";
  }
  //var iconPos = bubble1.getBoundingClientRect();
  popUpPercentages.style.left = (iconPos.left-25) + "px";
  popUpPercentages.style.top = (window.scrollY + iconPos.top+27) + "px";
  popUpPercentages.style.display = "block";
}

function hidePopupPercentages(){
popUpPercentages.style.display = "none";
}

