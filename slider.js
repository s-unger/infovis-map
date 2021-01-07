var germanyData = [];
function importGermanData(){
   //d3.json("https://opendata.ecdc.europa.eu/covid19/subnationalcaseweekly/json/", function(data){
    d3.json("coronaData.json", function(data){
     console.log("Importing...");
     data.forEach(element => {
      if(element.country == "Germany"){
        console.log("Importing = "+element.region_name);
        germanyData.push(element);
      }
      else{
        console.log("Item not found...");
      }
     });
     console.log("German data:" +germanyData);
    
  });
}

importGermanData();

var formatDateIntoMonthOfYear = d3.timeFormat("%B %Y");
var formatDate = d3.timeFormat("CW %W/%Y");
var parseDate = d3.timeParse("%m/%d/%y");

var startDate = new Date("2019-01-01"),
    endDate = new Date("2020-10-30"),
    currentDate = new Date("2019-01-01");

var margin = {top:50, right:50, bottom:0, left:50},
    width = 560 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

//var headlineWeek = document.getElementById("current-week");

////////// slider //////////

var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#play-button");

var bavarianCasesSVG = d3.select("#virusSVG");

var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height/5 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          updateslider(x.invert(currentValue));
        })
    );

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoMonthOfYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")");


////////// plot //////////

function updateslider(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));

    currentDate = formatDate(h);
    document.getElementById("current-week").innerHTML = "Current week: "+currentDate;
    
    resizeVirus(currentDate, "Bayern", "virusSVGBayern", "coronavirus.svg");
    /*resizeVirus(currentDate, "Baden-Wurttemberg", "virusSVGBadenWuerttemberg");
    resizeVirus(currentDate, "Nordrhein-Westfalen", "virusSVGNrw");
    resizeVirus(currentDate, "Hessen", "virusSVGHessen");
    resizeVirus(currentDate, "Niedersachsen", "virusSVGNiedersachsen");
    resizeVirus(currentDate, "Schleswig-Holstein", "virusSVGSchleswigHolst");
    resizeVirus(currentDate, "Mecklenburg-Vorpommern", "virusSVGMecklVorp");
    resizeVirus(currentDate, "Saarland", "virusSVGSaarland");
    resizeVirus(currentDate, "Rheinland-Pfalz", "virusSVGRheinlandPfalz");
    resizeVirus(currentDate, "Thuringen", "virusSVGThueringen");
    resizeVirus(currentDate, "Hamburg", "virusSVGHamburg");
    resizeVirus(currentDate, "Bremen", "virusSVGBremen");
    resizeVirus(currentDate, "Berlin", "virusSVGBerlin");
    resizeVirus(currentDate, "Brandenburg", "virusSVGBrandenburg");
    resizeVirus(currentDate, "Sachsen-Anhalt", "virusSVGSachsenAnhalt");
    resizeVirus(currentDate, "Sachsen", "virusSVGSachsen");*/
    


}

function getCurrentWeek(){
  return currentDate;
}

function resizeVirus(currentDate, region, id){
  var value = getCasesOfWeek(currentDate, region, id);
  //console.log("-----------Value cases of Week: "+value);
  /*if((value != null) && (value >0)){
    console.log("Found cases: "+value);
    var newValue = 200*value/100;
    document.getElementById("virusSVG").height=newValue;
    document.getElementById("virusSVG").width=newValue;
  }*/
}

function getCasesOfWeek(currentDate, region, id){
  germanyData.forEach(element => {
    if(currentDate != null){
      var newDateFormat = currentDate.toString().substring(6,10)+"-"+currentDate.toString().charAt(1)+currentDate.toString().substring(3,5);
      //console.log("CurrentDate: "+currentDate.toString());
      if(newDateFormat.includes("2019")){
        //document.getElementById(id).height=0;
          //document.getElementById(id).width=0;
      }
    //console.log("New Date Format: "+newDateFormat);
    //console.log("Dateformat 1: "+element.year_week);
    
      else if((element.region_name == region) && (element.year_week == newDateFormat)){
        //console.log("++++++++++++++found a bavarian match!!!!!!!!!! ");
        //console.log("++++++++++++++found a bavarian match!!!!!!!!!! "+element.rate_14_day_per_100k);
        //console.log("++++++++++++++match type: "+typeof(element.rate_14_day_per_100k));
        if((element.rate_14_day_per_100k != null) && (element.rate_14_day_per_100k >0)){
          console.log("Found cases: "+element.rate_14_day_per_100k);
          var newValue = 200*element.rate_14_day_per_100k/100;
          //document.getElementById(id).style.transform = "scale(1,2, newValue)";
          
          //document.getElementById(id).height=newValue;
          //document.getElementById(id).width=newValue;

          //document.getElementById(id).height=100;
          //document.getElementById(id).width=100;
          
          var canvas = document.getElementById(id);
          context = canvas.getContext('2d');

          //canvas.width = 50;
          //canvas.height = 50;

          //canvas.style.transform = 'scale(0.8)';


          //context.translate(-newValue/2, -newValue/2);

          base_image = new Image();
          base_image.src = 'coronavirus.svg';
          base_image.onload = function(){
            context.drawImage(base_image, 0, 0, base_image.width, base_image.height,     // source rectangle
              0, 0, canvas.width, canvas.height);
          }

          canvas.style.transform = 'scale('+element.rate_14_day_per_100k/300+')';

          /*const getDrawImageParams = (image, scale) => {
            const {naturalWidth: imageWidth, naturalHeight: imageHeight} = image;
            
            return {
              sx: 0,
              sy: 0,
              sWidth: imageWidth,
              sHeight: imageHeight,
              dx: 0,
              dy: 0,
              dWidth: imageWidth * scale,
              dHeight: imageHeight * scale,
            };
          };
          
          // Get our canvas and image
          
          const canvas = document.getElementById(id);
          const image = new Image();
          image.src = 'coronavirus.svg';
          const ctx = canvas.getContext("2d");
          
          // Get the params for this resize transformation, we try to get an image half the size
          const scale = element.rate_14_day_per_100k/1000;
          const {sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight} = getDrawImageParams(image, scale);
          
          // Set the canvas to the resulting "destination" size
          canvas.width = dWidth;
          canvas.height = dHeight;
          
          // Paste our resized image using the params
          ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);*/
          
          //context.translate(-70, 0);
        
          
        }
        return element.rate_14_day_per_100k;
      }
      else{
        //console.log("-------------couldnt find a match for "+region)
      }
    }
    else{
      //console.log("-------------currentdate is null")
    }
  });
}

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}

/*function testButton(){
  germanyData.forEach(element => {
    if(element.region_name == "Bayern" && element.year_week == "2020-W34"){
      var cases =  element.rate_14_day_per_100k;
      console.log("found a bavarian match!!!!!!!!!! "+element.year_week);
      var newValue = 200*cases/100;
      document.getElementById("virusSVG").height=newValue;
      document.getElementById("virusSVG").width=newValue;
    }
  });
}*/


