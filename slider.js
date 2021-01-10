var germanyData = [];
function importGermanData(){
   //d3.json("https://opendata.ecdc.europa.eu/covid19/subnationalcaseweekly/json/", function(data){
    d3.json("coronaData.json", function(data){
     //console.log("Importing...");
     data.forEach(element => {
      if(element.country == "Germany"){
        //console.log("Importing = "+element.region_name);
        germanyData.push(element);
      }
      else{
        //console.log("Item not found...");
      }
     });
     //console.log("German data:" +germanyData);

  });
}

importGermanData();

var handle, slider, currentDate, startDate, endDate, x, formatDate;

createSlider("2020")

function createSlider(year) {
  document.getElementById("slider").innerHTML = "";
  //var formatDateIntoMonthOfYear = d3.timeFormat("%B %Y");
  formatDate = d3.timeFormat("CW %W/%Y");
  //var parseDate = d3.timeParse("%m/%d/%y");
  if(year == "") {
    startDate = new Date("2019-01-01");
    endDate = new Date("2020-12-31");
    currentDate = new Date("2019-01-01");
  } else if(year == "2019") {
    startDate = new Date("2019-01-01");
    endDate = new Date("2019-12-31");
    currentDate = new Date("2019-01-01");
  } else if(year == "2020") {
    startDate = new Date("2020-01-01");
    endDate = new Date("2020-12-31");
    currentDate = new Date("2020-01-01");
  }

  /*startDate = new Date("2019-01-01");
  endDate = new Date("2020-10-30");
  currentDate = new Date("2019-01-01");*/

  var marginSlider = {top:30, right:50, bottom:30, left:50}, // 50 50 0 50
      widthSlider = 560 - marginSlider.left - marginSlider.right,
      heightSlider = 100 - marginSlider.top - marginSlider.bottom; // 300

  var svgSlider = d3.select("#slider")
      .append("svg")
      .attr("width", widthSlider + marginSlider.left + marginSlider.right)
      .attr("height", heightSlider + marginSlider.top + marginSlider.bottom); // heightSlider + marginSlider.top + marginSlider.bottom

  //var headlineWeek = document.getElementById("current-week");

  ////////// slider //////////

  //var moving = false;
  var currentValue = 0;
  var targetValue = widthSlider;

  //var bavarianCasesSVG = d3.select("#virusSVG");

  x = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, targetValue])
      .clamp(true);

  var slider = svgSlider.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + marginSlider.left + "," + heightSlider + ")"); // /5

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
      .attr("font-size", "small")
      .text(function(d) { if(year==""){return (d.toLocaleDateString('de-DE', { month: 'short' }) + " " + d.getFullYear().toString().slice(2,4)) 
        } else {return (d.toLocaleDateString('de-DE', { month: 'short' })) }; }); // formatDateIntoMonthOfYear(d)

  handle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);

  label = slider.append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .text(formatDate(startDate))
      .attr("transform", "translate(0," + (-25) + ")");
}


////////// plot //////////

function updateslider(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));

    currentDate = formatDate(h);
    document.getElementById("current-week").innerHTML = "Current week: "+currentDate;
/*
    resizeVirus(currentDate, "Bayern", "virusSVGBayern");
    resizeVirus(currentDate, "Baden-Wurttemberg", "virusSVGBaden");
    resizeVirus(currentDate, "Nordrhein-Westfalen", "virusSVGNrw");
    resizeVirus(currentDate, "Hessen", "virusSVGHessen");
    resizeVirus(currentDate, "Niedersachsen", "virusSVGNiedersachsen");
    resizeVirus(currentDate, "Schleswig-Holstein", "virusSVGSchleswigHolst");
    resizeVirus(currentDate, "Mecklenburg-Vorpommern", "virusSVGMecklVorp");
    resizeVirus(currentDate, "Saarland", "virusSVGSaarland");
    resizeVirus(currentDate, "Rheinland-Pfalz", "virusSVGRheinlandPfalz");
    resizeVirus(currentDate, "Thuringen", "virusSVGThueringen");
    resizeVirus(currentDate, "Sachsen", "virusSVGSachsen");
    resizeVirus(currentDate, "Hamburg", "virusSVGHamburg");
    resizeVirus(currentDate, "Bremen", "virusSVGBremen");
    resizeVirus(currentDate, "Berlin", "virusSVGBerlin");
    resizeVirus(currentDate, "Brandenburg", "virusSVGBrandenburg");
    resizeVirus(currentDate, "Sachsen-Anhalt", "virusSVGSachsenAnhalt");*/

    updateArticleTime(currentDate);
    updateMapTime(currentDate);
    draw_wordcloud(currentDate);
    update_virusicons(currentDate);
    replace_graph(keyword_1, keyword_2, true, h, selectedYear)

  // filter data set and redraw plot
/*  var newData = dataset.filter(function(d) {
    return d.date < h;
  });*/


}

function getCurrentWeek(){
  return currentDate;
}

function getCasesOfWeek(currentDate, region, id){
  germanyData.forEach(element => {
    if(currentDate != null){
      var newDateFormat = currentDate.toString().substring(6,10)+"-"+currentDate.toString().charAt(1)+currentDate.toString().substring(3,5);
      if(newDateFormat.includes("2019")){
        return 0;
      }
      else if((element.region_name == region) && (element.year_week == newDateFormat)){

        if((element.rate_14_day_per_100k != null) && (element.rate_14_day_per_100k >0)){
          //console.log("Found cases: "+element.rate_14_day_per_100k);
          return element.rate_14_day_per_100k/300;
        }
        //return element.rate_14_day_per_100k;
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
