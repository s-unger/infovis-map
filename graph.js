// preselect 2020
var selectedYear = "2020" 
replace_graph("corona", "keines", true, null, selectedYear);

// when slider moves or keyword changes, replace graph with new data
function replace_graph(keyword1, keyword2, showFocusLine, keyDate, year) {

  // select data path and first date depending on chosen year
  var yearPath = ""
  var firstDate = new Date()
  if(year == "") {
    yearPath = ""
    firstDate = new Date("2019-01-01")
  } else if(year == "2019") {
    yearPath = year + "/"
    firstDate = new Date("2019-01-01")
  } else if(year == "2020") {
    yearPath = year + "/"
    firstDate = new Date("2020-01-01")
  }

  // set default date for focus line 
  if(keyDate == null) {
    keyDate = firstDate
  }

  // calculate ratio to compare two keywords
  ratio = 1.0
  secondKeyChosen = (keyword2 != "keines")
  var path = "data/keywords/"+yearPath
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
  }

  // reset graph to zero before filling it with new data
  document.getElementById("graph").innerHTML = "";

  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 40, bottom: 60, left: 30}, 
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#graph")
    .append("svg")
      .attr("viewBox", `0 0 600 300`)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // read the data
  d3.csv(path+keyword1+".csv",
    function(d){
      // preprocess data
      if(year != "") {
        if (d.date.slice(0,4) == year) {
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
    // add X axis
      var x = d3.scaleTime() 
        .domain(d3.extent(data, function(d) {return d.date;  }))
        .range([ 0, width ]);
      if (year != "") { 
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x)
          .ticks(d3.timeDay.every(32))
          .tickFormat(function(d) {
            return d3.timeFormat("%b")(d)
          })
          .tickSizeInner(5))
      } else {
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
      }

      // add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.value;  })])
        .range([ height, 0 ]);
      if(!secondKeyChosen || (secondKeyChosen && Math.round(ratio*1000) >= 1000)) {
        svg.append("g")
        .call(d3.axisLeft(y));
      }

      // add first graph line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "indianred")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { if(ratio < 1.0) {return y(d.value*ratio)} else { return y(d.value) } }))

      // add selected date to focus line
      var focusTextDate = svg
        .append('g')
        .append('text')
          .style("opacity", 0)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("y", -10)

       // find the closest X index of the mouse
       var bisect = d3.bisector(function(d) { return x(d.date); }).left;

       // add focus line
       var focus = svg
         .append('g')
         .append('line')
         .attr('y1', 0)
         .attr('y2', height)
         .attr("stroke", "black")
           .attr('r', 8.5)
           .style("opacity", 0)
 
       // add text regarding first graph line on focus line
       var focusText = svg
         .append('g')
         .append('text')
           .style("opacity", 0)
           .attr("text-anchor", "left")
           .attr("alignment-baseline", "left")
           .attr("fill", "indianred")
      
      // add second graph line, read data
      if (secondKeyChosen) {
        d3.csv(path+keyword2+".csv",
        function(d){
          // preprocess data 
          if(year != "") {
            if (d.date.slice(0,4) == year) {
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
            if(Math.round(ratio*1000) < 1000) {
              y = d3.scaleLinear()
                .domain([0, d3.max(data2, function(d) { return +d.value; })])
                .range([ height, 0 ]);
              svg.append("g")
                .call(d3.axisLeft(y));
            }

            // add text regarding first graph line on focus line
            var focusText1 = svg
              .append('g')
              .append('text')
                .style("opacity", 0)
                .attr("text-anchor", "right")
                .attr("alignment-baseline", "left")
                .attr("fill", "indianred")

            // add focus line
            var focus2 = svg
              .append('g')
              .append('line')
              .attr('y1', 0)
              .attr('y2', height)
              .attr("stroke", "black")
                .attr('r', 8.5)
                .style("opacity", 0)

            // add text regarding second graph line on focus line
            var focusText2 = svg
              .append('g')
              .append('text')
                .style("opacity", 0)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "left")
                .attr("fill", "steelblue")

            // add second graph line
            svg.append("path")
              .datum(data2)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 1.5)
              .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
              )

            // create a rect on top of the svg area to cover mouse position
            svg
              .append('rect')
              .style("fill", "none")
              .style("pointer-events", "all")
              .attr('width', width)
              .attr('height', height)
              .on('mouseover', mouseover2)
              .on('mousemove', mousemove2)
              .on('mouseout', mouseout2);  
              
            if(showFocusLine) {
              mouseover2()
              showFocus2()
            }

            // show focus line and text
            function mouseover2() {
              focus2.style("opacity", 0.5)
              focusTextDate.style("opacity", 0.8)
              focusText1.style("opacity", 0.8)
              focusText2.style("opacity",0.8)
              focus.style("opacity", 0)
              focusText.style("opacity", 0)
            }

            function mousemove2() {
              // recover coordinate 
              var x0 = x.invert(d3.mouse(this)[0]);
              var i = bisect(data2, x(x0), 1);
              selectedData2 = data2[i]
              var j = bisect(data, x(x0), 1);
              selectedData1 = data[j]
              if(selectedData2) {
                adjustHeight1 = 0
                adjustHeight2 = 0
                if(secondKeyChosen && ratio > 1.0) {
                  yVal1 = selectedData1.value
                  yVal2 = selectedData2.value
                  // focus text should not be display to high
                  if (yVal1 > 90) {
                    adjustHeight1 = yVal1 - 90
                  }
                  if (yVal2 > 90) {
                    adjustHeight2 = yVal2 - 90
                  }
                  focus2
                    .attr('x1', x(selectedData2.date))
                    .attr('x2', x(selectedData2.date))
                  focusTextDate
                    .html(selectedData1.date.toLocaleDateString('de-DE'))
                      .attr("x", x(selectedData1.date))
                  focusText1
                    .html(selectedData1.value + "%")
                      .attr("x", x(selectedData1.date)-40)
                      .attr("y", y(selectedData1.value) + adjustHeight1)
                  focusText2
                  .html(Math.round(selectedData2.value) + "%")
                    .attr("x", x(selectedData2.date)+10)
                    .attr("y", y(selectedData2.value) + adjustHeight2)
                } else {
                  yVal1 = selectedData1.value
                  yVal2 = selectedData2.value
                  if (yVal1 > 90) {
                    adjustHeight1 = yVal1 - 90
                  }
                  if (yVal2 > 90) {
                    adjustHeight2 = yVal2 - 90
                  }
                  focus2
                    .attr('x1', x(selectedData2.date))
                    .attr('x2', x(selectedData2.date))
                  focusTextDate
                    .html(selectedData1.date.toLocaleDateString('de-DE'))
                      .attr("x", x(selectedData1.date))
                  focusText1
                    .html(Math.round(selectedData1.value) + "%") 
                      .attr("x", x(selectedData1.date)-40)
                      .attr("y", y(selectedData1.value) + adjustHeight1) 
                  focusText2
                  .html(selectedData2.value + "%")
                    .attr("x", x(selectedData2.date)+10)
                    .attr("y", y(selectedData2.value) + adjustHeight2)
                }
              }
            }

            // reset focus line position
            function mouseout2() {
              showFocus2()
            }

            function showFocus2() {
              // recover coordinate
              var x0 = keyDate;
              var i = bisect(data2, x(x0), 1);
              selectedData2 = data2[i]
              var j = bisect(data, x(x0), 1);
              selectedData1 = data[j]
              if(selectedData2) {
                adjustHeight1 = 0
                adjustHeight2 = 0
                if(secondKeyChosen && ratio > 1.0) {
                  yVal1 = selectedData1.value
                  yVal2 = selectedData2.value
                  if (yVal1 > 90) {
                    adjustHeight1 = yVal1 - 90
                  }
                  if (yVal2 > 90) {
                    adjustHeight2 = yVal2 - 90
                  }
                  focus2
                    .attr('x1', x(selectedData2.date))
                    .attr('x2', x(selectedData2.date))
                  focusTextDate
                    .html(selectedData1.date.toLocaleDateString('de-DE'))
                      .attr("x", x(selectedData1.date))
                  focusText1
                    .html(selectedData1.value + "%")
                      .attr("x", x(selectedData1.date)-40)
                      .attr("y", y(selectedData1.value) + adjustHeight1)
                  focusText2
                  .html(Math.round(selectedData2.value) + "%")
                    .attr("x", x(selectedData2.date)+10)
                    .attr("y", y(selectedData2.value) + adjustHeight2)
                } else {
                  yVal1 = selectedData1.value
                  yVal2 = selectedData2.value
                  if (yVal1 > 90) {
                    adjustHeight1 = yVal1 - 90
                  }
                  if (yVal2 > 90) {
                    adjustHeight2 = yVal2 - 90
                  }
                  focus2
                    .attr('x1', x(selectedData2.date))
                    .attr('x2', x(selectedData2.date))
                  focusTextDate
                    .html(selectedData1.date.toLocaleDateString('de-DE'))
                      .attr("x", x(selectedData1.date))
                  focusText1
                    .html(Math.round(selectedData1.value) + "%")
                      .attr("x", x(selectedData1.date)-40)
                      .attr("y", y(selectedData1.value) + adjustHeight1) 
                  focusText2
                  .html(selectedData2.value + "%")
                    .attr("x", x(selectedData2.date)+10)
                    .attr("y", y(selectedData2.value) + adjustHeight2)
                }
              }
            }

        })
      } else {
        if(showFocusLine) {
          mouseover()
          showFocus()
        }
      }

      // rect on top of the svg area to cover mouse position
      svg
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

      // show focus text when mouse in graph
      function mouseover() {
        focus.style("opacity", 0.5)
        focusTextDate.style("opacity", 0.7)
        focusText.style("opacity",0.8)
      }

      function mousemove() {
        // recover coordinate
        var x0 = x.invert(d3.mouse(this)[0]);
        var i = bisect(data, x(x0), 1);
        selectedData = data[i]
        if(selectedData) {
          adjustHeight = 0
          if(secondKeyChosen && ratio < 1.0) {
            yVal = selectedData.value/ratio
            if (yVal > 90) {
              adjustHeight = yVal - 90
            }
            focus
              .attr('x1', x(selectedData.date))
              .attr('x2', x(selectedData.date))
            focusTextDate
              .html(selectedData.date.toLocaleDateString('de-DE'))
                .attr("x", x(selectedData.date))
            focusText
            .html(selectedData.value + "%")
              .attr("x", x(selectedData.date)+10)
              .attr("y", y(selectedData.value/ratio) + adjustHeight)
          } else {
            yVal = selectedData.value
            if (yVal > 90) {
              adjustHeight = yVal - 90
            }
            focus
              .attr('x1', x(selectedData.date))
              .attr('x2', x(selectedData.date))
              focusTextDate
              .html(selectedData.date.toLocaleDateString('de-DE'))
                .attr("x", x(selectedData.date))
            focusText
            .html(selectedData.value + "%")
              .attr("x", x(selectedData.date)+10)
              .attr("y", y(selectedData.value) + adjustHeight)
          }
        }
      }
      // reset focus line position
      function mouseout() {
        showFocus()
      }

      function showFocus() {
        // recover coordinate 
        var x0 = keyDate;
        var i = bisect(data, x(x0), 1);
        selectedData = data[i]
        if(selectedData) {
          adjustHeight = 0
          if(secondKeyChosen && ratio < 1.0) {
            yVal = selectedData.value/ratio
            if (yVal > 90) {
              adjustHeight = yVal - 90
            }
            focus
              .attr('x1', x(selectedData.date))
              .attr('x2', x(selectedData.date))
            focusTextDate
              .html(selectedData.date.toLocaleDateString('de-DE'))
                .attr("x", x(selectedData.date))
            focusText
            .html(selectedData.value + "%")
              .attr("x", x(selectedData.date)+10)
              .attr("y", y(selectedData.value/ratio) + adjustHeight)
          } else {
            yVal = selectedData.value
            if (yVal > 90) {
              adjustHeight = yVal - 90
            }
            focus
              .attr('x1', x(selectedData.date))
              .attr('x2', x(selectedData.date))
              focusTextDate
              .html(selectedData.date.toLocaleDateString('de-DE'))
                .attr("x", x(selectedData.date))
            focusText
            .html(selectedData.value + "%")
              .attr("x", x(selectedData.date)+10)
              .attr("y", y(selectedData.value) + adjustHeight)
          }
        }
      }

    })
}
