var germanyData = [];
/* This function converts the manually prefiltered json german corona data into a data object that is used 
    in later processing. */
function importGermanData(){
   //d3.json("https://opendata.ecdc.europa.eu/covid19/subnationalcaseweekly/json/", function(data){
    d3.json("coronaData.json", function(data){
     data.forEach(element => {
      if(element.country == "Germany"){
        germanyData.push(element);
      }
     });
  });
}

importGermanData();

var handle, slider, currentDate, startDate, endDate, x, formatDate;
var currentValue = 0;

createSlider("2020");

/* This function creates the slider, specifying the displayed dates and setting the slider to the corresponding HTML element. */

function createSlider(year) {
  document.getElementById("slider").innerHTML = "";
  formatDate = d3.timeFormat("CW %W/%Y");
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


  var marginSlider = {top:30, right:50, bottom:30, left:50}, // 50 50 0 50
      widthSlider = 560 - marginSlider.left - marginSlider.right,
      heightSlider = 100 - marginSlider.top - marginSlider.bottom; // 300

  var svgSlider = d3.select("#slider")
      .append("svg")
      .attr("width", widthSlider + marginSlider.left + marginSlider.right)
      .attr("height", heightSlider + marginSlider.top + marginSlider.bottom); // heightSlider + marginSlider.top + marginSlider.bottom


  ////////// slider //////////

  /* Specifying the slider appearance and displayed texts. */
  var targetValue = widthSlider;

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


////////// update //////////

/* this function is called on slider drag- meaning when the position changes.
    This is the central update function of the application, within which all components like the map,
    graphs, articles and wordcloud are updated.*/

function updateslider(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));

    currentDate = formatDate(h);
    updateArticleTime(currentDate);
    updateMapTime(currentDate);
    draw_wordcloud(currentDate);
    if (focused == null) {
      update_virusicons(currentDate);
    }
    replace_graph(keyword_1, keyword_2, true, h, selectedYear)

}

function getCurrentWeek(){
  return currentDate;
}

