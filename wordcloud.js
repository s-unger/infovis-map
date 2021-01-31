var wordcloud_files = [];
draw_wordcloud("CW 00/2019");
var wordcloud_last_calendar_week = -1;
var wordcloud_effect_running = false;


function draw_wordcloud(weekandyear_text) {
  if(wordcloud_files.length == 0) {
    get_all_data(weekandyear_text);
  } else {
    //Woche parsen und zu Index umwandeln:
    calendarweek = parseInt(weekandyear_text.slice(3, 5));
    year = parseInt(weekandyear_text.slice(6, 10));
    if (year == 2020) {
      calendarweek = calendarweek+52;
      if (calendarweek == 104) {
        calendarweek = 103;
      }
    }
    if (calendarweek != wordcloud_last_calendar_week) {
      wordcloud_last_calendar_week = calendarweek;
      document.getElementById("tagcloud").innerHTML = "<h3>Meistgesucht in dieser Woche</h3>";
      
      // List of words
      var myWords = [{word: "alkohol", size: wordcloud_files[0][calendarweek].value}, {word: "attila hildmann", size: wordcloud_files[1][calendarweek].value}, {word: "bananenbrot", size: wordcloud_files[2][calendarweek].value}, {word: "baumarkt", size: wordcloud_files[3][calendarweek].value}, {word: "BER", size: wordcloud_files[4][calendarweek].value}, {word: "bill gates", size: wordcloud_files[5][calendarweek].value}, {word: "corona", size: wordcloud_files[5][calendarweek].value}, {word: "desinfektionsmittel", size: wordcloud_files[5][calendarweek].value}, {word: "drosten", size: wordcloud_files[5][calendarweek].value}, {word: "homeworkout", size: wordcloud_files[5][calendarweek].value}, {word: "klopapier", size: wordcloud_files[5][calendarweek].value}, {word: "kneipentour", size: wordcloud_files[5][calendarweek].value}, {word: "maske", size: wordcloud_files[5][calendarweek].value}, {word: "merkel", size: wordcloud_files[5][calendarweek].value}, {word: "netflix", size: wordcloud_files[5][calendarweek].value}, {word: "oktoberfest", size: wordcloud_files[5][calendarweek].value}, {word: "onlinesemester", size: wordcloud_files[5][calendarweek].value}, {word: "querdenken", size: wordcloud_files[5][calendarweek].value}, {word: "söder", size: wordcloud_files[5][calendarweek].value}, {word: "zoom", size: wordcloud_files[5][calendarweek].value}]
      
      for (var i = 0; i<20; i++) {
        myWords[i].size = 10+(myWords[i].size*0.7); //Kompressionsfaktor, es geht nur darum, dass die Peaks der Wörter hier sichtbar sind, nicht um akurate Darstellung.
      }

      // set the dimensions and margins of the graph
      var marginWords = {top: 0, right: 0, bottom: 0, left: 0},
          widthWords = 750 - marginWords.left - marginWords.right, // 550
          heightWords = 200 - marginWords.top - marginWords.bottom; // 300

      // append the svg object to the body of the page
      var svg2 = d3.select("#tagcloud").append("svg")
          .attr("viewBox", `0 0 750 200`) // 550 300 
        .append("g")
          .attr("transform",
          "translate(" + marginWords.left + "," + marginWords.top + ")");
          
       /*var borderPath = svg2.append("rect")
       .attr("x", 0)
       .attr("y", 0)
       .attr("height", heightWords)
       .attr("width", widthWords)
       .style("stroke", "black")
       .style("fill", "none")
       .style("stroke-width", 2);*/

      // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
      // Wordcloud features that are different from one word to the other must be here
      var layout = d3.layout.cloud()
        .size([widthWords, heightWords])
        .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
        .padding(5)        //space between words
        .rotate(function() { return 0; })
        .fontSize(function(d) { return d.size; })      // font size of words
        .on("end", draw);
      layout.start();

      // This function takes the output of 'layout' above and draw the words
      // Wordcloud features that are THE SAME from one word to the other can be here
      function draw(words) {
        svg2
          .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
        .data(words)
            .enter().append("text")
        .on("click", function (d, i){
            select_keyword_1(d.text);
        })
        .on("mouseover", function(d) {   
          d3.select(this).style("cursor", "pointer");
        })                  
        .on("mouseout", function(d) {       
          d3.select(this).style("cursor", "default");
        })
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#000000")
        .attr("text-anchor", "middle")
        .style("font-family", "'Times New Roman', Times, serif")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
      }
    }
  }
}

function get_all_data(weekandyear_text) {
  d3.queue()
  .defer(d3.csv, "data/keywords/alkohol.csv")
  .defer(d3.csv, "data/keywords/attila hildmann.csv")
  .defer(d3.csv, "data/keywords/bananenbrot.csv")
  .defer(d3.csv, "data/keywords/baumarkt.csv")
  .defer(d3.csv, "data/keywords/BER.csv")
  .defer(d3.csv, "data/keywords/bill gates.csv")
  .defer(d3.csv, "data/keywords/corona.csv")
  .defer(d3.csv, "data/keywords/desinfektionsmittel.csv")
  .defer(d3.csv, "data/keywords/drosten.csv")
  .defer(d3.csv, "data/keywords/homeworkout.csv")
  .defer(d3.csv, "data/keywords/klopapier.csv")
  .defer(d3.csv, "data/keywords/kneipentour.csv")
  .defer(d3.csv, "data/keywords/maske.csv")
  .defer(d3.csv, "data/keywords/merkel.csv")
  .defer(d3.csv, "data/keywords/netflix.csv")
  .defer(d3.csv, "data/keywords/oktoberfest.csv")
  .defer(d3.csv, "data/keywords/onlinesemester.csv")
  .defer(d3.csv, "data/keywords/querdenken.csv")
  .defer(d3.csv, "data/keywords/söder.csv")
  .defer(d3.csv, "data/keywords/zoom.csv")
  .await(function(error, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20) {
    if (error) throw error;
    wordcloud_files = [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20]
    draw_wordcloud(weekandyear_text);
  });
}
