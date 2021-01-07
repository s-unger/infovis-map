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
          console.log("user is dragging...")
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
    updateArticleTime(currentDate);
  // filter data set and redraw plot
/*  var newData = dataset.filter(function(d) {
    return d.date < h;
  });*/
}

function resizeVirus(){
  var value = 37;
  var newValue = 200*value/100;
  document.getElementById("virusSVG").height=newValue;
  document.getElementById("virusSVG").width=newValue;


  console.log("resizing button");

  testImport();
}

function testImport(){
   d3.json("https://opendata.ecdc.europa.eu/covid19/subnationalcaseweekly/json/", function(data){
     console.log("Importing...");
    if(data.region_name === "Bayern" && data.year_week === "2020-W34"){
      console.log("Import working! cases = "+data.rate_14_day_per_100k);
    }
    else{
      console.log("Item not found...");
    }
  });
}
