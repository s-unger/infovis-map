var selectedYear = "" // /2019 oder /2020


replace_graph("corona", "keines");



function replace_graph(keyword1, keyword2) {
  ratio = 1.0
  secondKeyChosen = (keyword2 != "keines")
  var path = "data/keywords/"+selectedYear
  if(secondKeyChosen) {
    keywords = [0.0,0.0]
    d3.csv(path+"quantifier.csv", 
      function(scaling){
        if (scaling.keyword == keyword1) {
          keywords[0] = scaling.factor
          return {factor : scaling.factor, keyword: 1}
        } else if (scaling.keyword == keyword2) {
          keywords[1] = scaling.factor
          return {factor : scaling.factor, keyword: 2}
        }
      },
      function(factorize) {
        ratio = parseFloat(keywords[0])/parseFloat(keywords[1])
      }
    )
    //ratio = parseFloat(keywords[0])/parseFloat(keywords[1])
  }
  document.getElementById("graph").innerHTML = "";
  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 500 - margin.left - margin.right,
      height = 220 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#graph")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv(path+keyword1+".csv",
    function(d){
      if(selectedYear != "") {
        if (d.date.slice(0,4) == selectedYear) {
          num = "0"
          if (!isNaN(parseInt(d.value))){
            if(secondKeyChosen && ratio < 1.0) {
              num = Math.round(d.value*ratio)
            } else {
              num = d.value
            }
          }
          return { date : d3.timeParse("%Y-%m-%d")(d.date), value : num }
        }
      } else {
        num = "0"
          if (!isNaN(parseInt(d.value))){
            if(secondKeyChosen && ratio < 1.0) {
              num = Math.round(d.value*ratio)
            } else {
              num = d.value
            }
          }
          return { date : d3.timeParse("%Y-%m-%d")(d.date), value : num }
      }
    },
    function(data) {
    // Add X axis --> it is a date format
      var x = d3.scaleTime() //scaleTime
        //.domain([1,100])
        .domain(d3.extent(data, function(d) {return d.date;  }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        //.domain([0, 100])
        .domain([0, d3.max(data, function(d) { return +d.value;  })])
        .range([ height, 0 ]);
      if(!secondKeyChosen || (secondKeyChosen && ratio > 1.0)) {
        svg.append("g")
        .call(d3.axisLeft(y));
      }
      
      // Add second line
      if (secondKeyChosen) {
        d3.csv(path+keyword2+".csv",
        function(d){
          if(selectedYear != "") {
            if (d.date.slice(0,4) == selectedYear) {
              num = "0"
              if (!isNaN(parseInt(d.value))){
                if(ratio > 1.0) {
                  num = Math.round(d.value/ratio)
                } else {
                  num = d.value
                }
              }
              return { date : d3.timeParse("%Y-%m-%d")(d.date), value : num }
            }
          } else {
            num = "0"
              if (!isNaN(parseInt(d.value))){
                if(ratio > 1.0) {
                  num = Math.round(d.value/ratio)
                } else {
                  num = d.value
                }
              }
            return { date : d3.timeParse("%Y-%m-%d")(d.date), value : num }
          }
        },
        function(data2) {
            
            if(ratio < 1.0) {
              y = d3.scaleLinear()
                .domain([0, d3.max(data2, function(d) { return +d.value; })])
                .range([ height, 0 ]);
              svg.append("g")
                .call(d3.axisLeft(y));
            }

            svg.append("path")
              .datum(data2)
              .attr("fill", "none")
              .attr("stroke", "indianred")
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
              )
        })
      }

     // This allows to find the closest X index of the mouse:
     var bisect = d3.bisector(function(d) { return x(d.date); }).left;

      // Create the circle that travels along the curve of chart
      var focus = svg
        .append('g')
        .append('circle')
          .style("fill", "none")
          .attr("stroke", "black")
          .attr('r', 8.5)
          .style("opacity", 0)

      // Create the text that travels along the curve of chart
      var focusText = svg
        .append('g')
        .append('text')
          .style("opacity", 0)
          .attr("text-anchor", "left")
          .attr("alignment-baseline", "middle")

      // Add first line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) }))

      

      // Create a rect on top of the svg area: this rectangle recovers mouse position
      svg
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

      // What happens when the mouse move -> show the annotations at the right positions.
      function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
      }

      function mousemove() {
        // recover coordinate we need
        var x0 = x.invert(d3.mouse(this)[0]);
        var i = bisect(data, x(x0), 1);
        selectedData = data[i]
        if(selectedData) {
          focus
            .attr("cx", x(selectedData.date))
            .attr("cy", y(selectedData.value))
          focusText
          .html(selectedData.value + "% am " + selectedData.date.toLocaleDateString('de-DE')) //.html("x:" + selectedData.date + "  -  " + "y:" + selectedData.value)
            .attr("x", x(selectedData.date)+15)
            .attr("y", y(selectedData.value))
          }
        }
      function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
      }

    })
}
