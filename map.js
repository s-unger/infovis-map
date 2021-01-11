 //Making global for later size update:
 var bayern_virus;
 var baden_virus;
 var nrw_virus;
 var hessen_virus;
 var niedersachsen_virus;
 var schleswigholst_virus;
 var mecklvorp_virus;
 var saarland_virus;
 var rheinlandpfalz_virus;
 var sachsen_virus;
 var thueringen_virus;
 var hamburg_virus;
 var bremen_virus;
 var berlin_virus;
 var brandenburg_virus;
 var sachsenanhalt_virus;
 
 
 var widthMap = 500,
    heightMap = 620,
    focused = null,
    geoPath;
    bayern=null;
    trendListAverage=null;
    trendList=null;
    map_calendarweek=0;
    map_year=0;
    map_currentWord="corona";
    

var svg = d3.select(".tempcenter")
  .append("svg")
    .attr("viewBox", "0 0 500 620")
    .attr("align","center");

svg.append("rect")
    .attr("class", "background")
    .attr("width", widthMap)
    .attr("height", heightMap);

var g = svg.append("g")
  .append("g")
    .attr("id", "states");

getTrendValueAverage(); 
getTrendValue();

d3.select("#myCheckbox").on("change",update);
d3.json("https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/master/2_bundeslaender/1_sehr_hoch.geo.json", function(collection) {

  var bounds = d3.geo.bounds(collection),
      bottomLeft = bounds[0],
      topRight = bounds[1],
      rotLong = -(topRight[0]+bottomLeft[0])/2;
      center = [(topRight[0]+bottomLeft[0])/2+rotLong, (topRight[1]+bottomLeft[1])/2],
      
      //default scale projection
      projection = d3.geo.albers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([widthMap/2,heightMap/2])
        .center(center),
        
      bottomLeftPx = projection(bottomLeft),
      topRightPx = projection(topRight),
      scaleFactor = 1.00*Math.min(widthMap/(topRightPx[0]-bottomLeftPx[0]), heightMap/(-topRightPx[1]+bottomLeftPx[1])),
      
      projection = d3.geo.albers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([widthMap/2,heightMap/2])
        .scale(scaleFactor*0.975*1000)
        .center(center);

  geoPath = d3.geo.path().projection(projection);
    
  var graticule = d3.geo.graticule()
      .step([1, 1]);
      
  bayern_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "260")
  .attr('y', '430');
  baden_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "130")
  .attr('y', '450');
  nrw_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "50")
  .attr('y', '240');
  hessen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "130")
  .attr('y', '300');
  niedersachsen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "160")
  .attr('y', '150');
  schleswigholst_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "170")
  .attr('y', '30');
  mecklvorp_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "280")
  .attr('y', '70');
  saarland_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "30")
  .attr('y', '390');
  rheinlandpfalz_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "60")
  .attr('y', '340');
  sachsen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "340")
  .attr('y', '270');
  thueringen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "230")
  .attr('y', '290');
  hamburg_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "180")
  .attr('y', '85');
  bremen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "130")
  .attr('y', '120');
  berlin_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "330")
  .attr('y', '160');
  brandenburg_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "360")
  .attr('y', '190');
  sachsenanhalt_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "260")
  .attr('y', '190');
  scale_to_zero();
  

 /* g.append("path")
      .datum(graticule)
     .attr("class", "graticuleLine")
      .attr("d", geoPath);*/
  
  g.selectAll("path.feature")
    .data(collection.features)
    .enter()
        
    .append("path")
    g.selectAll('path').each(function (d, i) { 
        if (i==0){

        d3.select(this).attr("id", "baden");
        
        }
        if (i==1){

        d3.select(this).attr("id", "bayern");
        
        }
        if (i==2){
        
        d3.select(this).attr("id", "berlin");
        
        }
        if (i==3){
        
        d3.select(this).attr("id", "brandenburg");
        
        }
        if (i==4){
        
        d3.select(this).attr("id", "bremen");
        }
        if (i==5){
        
        d3.select(this).attr("id", "hamburg");
        }
        if (i==6){
        
        d3.select(this).attr("id", "hessen");
        }
        if (i==7){
        
        d3.select(this).attr("id", "mecklenburg");
        }
        if (i==8){
        
        d3.select(this).attr("id", "niedersachsen");
        }
        if (i==9){
        
        d3.select(this).attr("id", "nrw");
        }
        if (i==10){
        
        d3.select(this).attr("id", "rheinland");
        }
        if (i==11){
        
        d3.select(this).attr("id", "saarland");
        }
        if (i==12){
        
        d3.select(this).attr("id", "sachsen-anhalt");
        }
        if (i==13){
        
        d3.select(this).attr("id", "sachsen");
        }
        if (i==14){
        
        d3.select(this).attr("id", "schleswig");
        }
        if (i==15){
        
        d3.select(this).attr("id", "thüringen");
        }
        
        })
    .attr("class", "feature")
    .attr("d", geoPath)
    .on("click", clickPath);

    //adaptColor(12);
    update();

  
});


//d3.select("#myCheckbox").on("change",update);
//update();
    
function update(){
    if(d3.select("#myCheckbox").property("checked")){
        colorBL();
    } else {
        adaptColor(map_calendarweek);
    }	
}
function colorBL() {

    trendListAverage.forEach(function (arrayItem) {
    var valueBL = arrayItem.Value;
    var nameBL = arrayItem.Kategorie;
    console.log("NAMEBL===");
    console.log(nameBL);
    if (nameBL=="Baden-Württemberg"){
        //console.log(valueBL);
        g.select("#baden").style("fill", getcolor(valueBL));
    }
    if (nameBL=="Bayern"){
        //console.log(valueBL);
        g.select("#bayern").style("fill", getcolor(valueBL));
    }
    if (nameBL=="Berlin"){
        //console.log(valueBL);
        g.select("#berlin").style("fill", getcolor(valueBL));
    }   
    if (nameBL=="Sachsen"){
        //console.log(valueBL);
        g.select("#sachsen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Nordrhein-Westfalen"){
        //console.log(valueBL);
        g.select("#nrw").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Thüringen"){
        //console.log(valueBL);
        g.select("#thüringen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Bremen"){
       // console.log(valueBL);
        g.select("#bremen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Sachsen-Anhalt"){
        //console.log(valueBL);
        g.select("#sachsen-anhalt").style("fill", getcolor(valueBL));
    } 
    if (nameBL=="Rheinland-Pfalz"){
       // console.log(valueBL);
        g.select("#rheinland").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Schleswig-Holstein"){
       // console.log(valueBL);
        g.select("#schleswig").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Niedersachsen"){
       // console.log(valueBL);
        g.select("#niedersachsen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Hessen"){
       // console.log(valueBL);
        g.select("#hessen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Hamburg"){
       // console.log(valueBL);
        g.select("#hamburg").style("fill", getcolor(valueBL));
    } 
    if (nameBL=="Saarland"){
       // console.log(valueBL);
        g.select("#saarland").style("fill", getcolor(valueBL));
    } 
    if (nameBL=="Mecklenburg-Vorpommern"){
       // console.log(valueBL);
        g.select("#mecklenburg").style("fill", getcolor(valueBL));
    }
    if (nameBL=="Brandenburg"){
       // console.log(valueBL);
        g.select("#brandenburg").style("fill", getcolor(valueBL));
    }   
    });
 
}
function getcolor(value) {
//console.log(value);
if (value<10){
    //console.log("1");
return "rgb(28, 234, 227)";
}

if (value<30 && value>19){
    //console.log("2");
    return "rgb(105, 210, 152)";
    
}
if (value<40 && value>29){
    
    return "rgb(170, 189, 89)";
    
}
if (value<50 && value>39){
    
    return "rgb(203, 178, 57)";
    //return "rgb(255, 0, 255)";
    
}
if (value<60&& value>49){
   
    return "rgb(236, 168, 25)";
    //return "rgb(255, 0, 255)";
    
}
if (value<70&& value>59){
    
    return "rgb(249, 123, 11)";
    
}
if (value<80&& value>69){
   
    return "rgb(251, 90, 8)";
    
}
if (value<90&& value>79){
   
    return "rgb(252, 57, 5)";

}
if (value>89){
    
    return "rgb(255, 0, 0)";
    
}

}
function getTrendValueAverage(){
    var wordData= "klopapier.csv";

    if (map_currentWord==="klopapier"){
        console.log("Klopapier ausgewählt");
        wordData= "klopapier.csv";
    }
    if (map_currentWord==="corona"){
        console.log("Average: Corona ausgewählt");
        wordData= "corona.csv";
    }
    if (map_currentWord==="bill gates"){
        console.log("Bill Gates ausgewählt");
        wordData= "billGates.csv";
    }
    if (map_currentWord==="netflix"){
        console.log("Bill Gates ausgewählt");
        wordData= "netflix.csv";
    }

d3.csv(wordData, function(data) {

data.forEach(function(d) {
d['Value'] = +d['Value'];
});
trendListAverage= data;
console.log("average");	
console.log(trendListAverage);
console.log(trendListAverage[0]);

});

};

function getTrendValue(){
    var wordData= "allBLKlopapier.csv";

    if (map_currentWord==="klopapier"){
        console.log("Klopapier ausgewählt");
        var wordData= "allBLKlopapier.csv";
    }
    if (map_currentWord==="corona"){
        var wordData= "allBLcorona.csv";
        console.log("Bl Corona liste");

    }
    if (map_currentWord==="bill gates"){
        console.log("Bill Gates ausgewählt");
        var wordData= "billGates.csv";
    }
    if (map_currentWord==="netflix"){
        console.log("Bill Gates ausgewählt");
        var wordData= "allBLnetflix.csv";
    }


    //var wordData= "allBLKlopapier.csv";

    d3.csv(wordData, function(data) {

    data.forEach(function(d) {
    d['Baden'] = +d['Baden'];
    d['Bayern'] = +d['Bayern'];
    d['Berlin'] = +d['Berlin'];
    d['Brandenburg'] = +d['Brandenburg'];
    d['Bremen'] = +d['Bremen'];
    d['Hamburg'] = +d['Hamburg'];
    d['Mecklenburg'] = +d['Mecklenburg'];
    d['Niedersachsen'] = +d['Niedersachsen'];
    d['Nordrhein'] = +d['Nordrhein'];
    d['Rheinland'] = +d['Rheinland'];
    d['SachsenA'] = +d['SachsenA'];
    d['Sachsen'] = +d['Sachsen'];
    d['Saarland'] = +d['Saarland'];
    d['Schleswig'] = +d['Schleswig'];
    d['Thüringen'] = +d['Thüringen'];
    d['Hessen'] = +d['Hessen'];
    });
    trendList= data;
    
    
    //console.log(trendList);
    //console.log(trendList[0]);
    //(1);
    //console.log("not average");	
    
    });
    //update();

};
function adaptColor(week){

    if (week==0){
        colorWeek0();

    }else{

    
    
    if (map_year==2019){
       week=week-1;
        //console.log("2019");
    }else{
        //console.log("2020");
        week=week+51;
        console.log("2020");
        
    }
trendList.forEach(function (d, i) {

    if (i==week){
    //colorBL2(d);
    g.select("#bayern").style("fill", getcolor(d.Bayern));
    console.log(week);
    console.log(d.Bayern);
   
    g.select("#berlin").style("fill", getcolor(d.Berlin));
    g.select("#bremen").style("fill", getcolor(d.Bremen));
    g.select("#brandenburg").style("fill", getcolor(d.Brandenburg));
    g.select("#hamburg").style("fill", getcolor(d.Hamburg));
    g.select("#hessen").style("fill", getcolor(d.Hessen));
    g.select("#mecklenburg").style("fill", getcolor(d.Mecklenburg));
    g.select("#niedersachsen").style("fill", getcolor(d.Niedersachsen));
    g.select("#nrw").style("fill", getcolor(d.Nordrhein));
    g.select("#rheinland").style("fill", getcolor(d.Rheinland));
    g.select("#saarland").style("fill", getcolor(d.Saarland));
    g.select("#sachsen").style("fill", getcolor(d.Sachsen));
    g.select("#schleswig").style("fill", getcolor(d.Schleswig));
    g.select("#thüringen").style("fill", getcolor(d.Thüringen));
    g.select("#baden").style("fill", getcolor(d.Baden));
    g.select("#sachsen-anhalt").style("fill", getcolor(d.SachsenA));
    }

});}
}

function updateMapTime(text_week) {
    map_calendarweek = parseInt(text_week.slice(3, 5));
    map_year = parseInt(text_week.slice(6, 10));
    adaptColor(map_calendarweek);
    
}

function updateGoogleTrend(currentWord) {
    map_currentWord= currentWord;
    console.log("update GOOGLETREND");
    getTrendValue();
    getTrendValueAverage();
    setTimeout(function() {  
        update();
    }, 1000);
    
    //executeAsynchronously(
    //    [getTrendValue(), getTrendValueAverage(), update()], 10);


}
function executeAsynchronously(functions, timeout) {
    for(var i = 0; i < functions.length; i++) {
      setTimeout(functions[i], timeout);
    }
  }

   function colorWeek0(){
    g.select("#berlin").style("fill", getcolor(50));
    g.select("#bremen").style("fill", getcolor(50));
    g.select("#brandenburg").style("fill", getcolor(50));
    g.select("#hamburg").style("fill", getcolor(50));
    g.select("#hessen").style("fill", getcolor(50));
    g.select("#mecklenburg").style("fill", getcolor(50));
    g.select("#niedersachsen").style("fill", getcolor(50));
    g.select("#nrw").style("fill", getcolor(50));
    g.select("#rheinland").style("fill", getcolor(50));
    g.select("#saarland").style("fill", getcolor(50));
    g.select("#sachsen").style("fill", getcolor(50));
    g.select("#schleswig").style("fill", getcolor(50));
    g.select("#thüringen").style("fill", getcolor(50));
    g.select("#baden").style("fill", getcolor(50));
    g.select("#sachsen-anhalt").style("fill", getcolor(50));
    g.select("#bayern").style("fill", getcolor(50));
   }         

function clickPath(d) {
  var x = widthMap/2,
      y = heightMap/2,
      k = 1,
      name = d.properties.NAME_1;

  g.selectAll("text")
    .remove();
  if ((focused === null) || !(focused === d)) {
    var centroid = geoPath.centroid(d),
        x = +centroid[0],
        y = +centroid[1],
        k = 1.75;
    focused = d;
    
    g.append("text")
      .text(name)
      .attr("x", x)
      .attr("y", y)
      .style("text-anchor","middle")
      .style("font-size","8px")
      .style("stroke-width","0px")
      .style("fill","black")
      .style("font-family","Times New Roman")
      .on("click", clickText);
  } else {
    focused = null;
  };

  g.selectAll("path")
      .classed("active", focused && function(d) { return d === focused; });
 
  g.transition()
      .duration(1000)
      .attr("transform", "translate("+ (widthMap/2) +","+ (heightMap/2) +")scale("+ k +")translate("+ (-x) +","+ (-y) +")")
      .style("stroke-width", 1.75/k +"px");
}


function clickText(d) {
  focused = null;
  g.selectAll("text")
      .remove();
  g.selectAll("path")
      .classed("active", 0);
  g.transition()
      .duration(1000)
      .attr("transform", "scale("+1+")translate("+0+","+0+")")
      .style("stroke-width", 1.00+"px");
}

function scaleIcon(icon, value) {
  var icon_bbox = icon.node().getBBox();
  var icon_x = icon_bbox.x;
  var icon_y = icon_bbox.y;
  var icon_scaling_factor = value;
  icon.attr('transform', 'translate('+(1 - icon_scaling_factor) * (icon_x+50)+', '+(1 - icon_scaling_factor) * (icon_y+50)+') scale('+icon_scaling_factor+')');
}

function update_virusicons(week_text) {
   setVirusIconScaleByCases(week_text, "Bayern", bayern_virus);
   setVirusIconScaleByCases(week_text, "Baden-Wurttemberg", baden_virus);
   setVirusIconScaleByCases(week_text, "Nordrhein-Westfalen", nrw_virus);
   setVirusIconScaleByCases(week_text, "Hessen", hessen_virus);
   setVirusIconScaleByCases(week_text, "Niedersachsen", niedersachsen_virus);
   setVirusIconScaleByCases(week_text, "Schleswig-Holstein", schleswigholst_virus);
   setVirusIconScaleByCases(week_text, "Mecklenburg-Vorpommern", mecklvorp_virus);
   setVirusIconScaleByCases(week_text, "Saarland", saarland_virus);
   setVirusIconScaleByCases(week_text, "Rheinland-Pfalz", rheinlandpfalz_virus);
   setVirusIconScaleByCases(week_text, "Thuringen", thueringen_virus);
   setVirusIconScaleByCases(week_text, "Sachsen", sachsen_virus);
   setVirusIconScaleByCases(week_text, "Hamburg", hamburg_virus);
   setVirusIconScaleByCases(week_text, "Bremen", bremen_virus);
   setVirusIconScaleByCases(week_text, "Berlin", berlin_virus);
   setVirusIconScaleByCases(week_text, "Brandenburg", brandenburg_virus);
   setVirusIconScaleByCases(week_text, "Sachsen-Anhalt", sachsenanhalt_virus);
}
function  setVirusIconScaleByCases(currentDate, region, icon){
  germanyData.forEach(element => {
  if(currentDate != null){
    var newDateFormat = currentDate.toString().substring(6,10)+"-"+currentDate.toString().charAt(1)+currentDate.toString().substring(3,5);
    if(newDateFormat.includes("2019")){
      scale_to_zero();
    }
    else if((element.region_name == region) && (element.year_week == newDateFormat)){

      if((element.rate_14_day_per_100k != null) && (element.rate_14_day_per_100k >0)){
        //console.log("Found cases: "+element.rate_14_day_per_100k/300);
        scaleIcon(icon, Math.sqrt((element.rate_14_day_per_100k/Math.PI))/10);
      } else {
        scaleIcon(icon, 0);
      }
      //return element.rate_14_day_per_100k;
    }
    else{
      //console.log("-------------couldnt find a match for "+region)
    }
  }
  else{
    //console.log("-------------currentdate is null")
    return 0;
  }
});
}



function scale_to_zero() {
  scaleIcon(bayern_virus, 0);
  scaleIcon(baden_virus, 0);
  scaleIcon(nrw_virus, 0);
  scaleIcon(hessen_virus, 0);
  scaleIcon(niedersachsen_virus, 0);
  scaleIcon(schleswigholst_virus, 0);
  scaleIcon(mecklvorp_virus, 0);
  scaleIcon(saarland_virus, 0);
  scaleIcon(thueringen_virus, 0);
  scaleIcon(hamburg_virus, 0);
  scaleIcon(bremen_virus, 0);
  scaleIcon(berlin_virus, 0);
  scaleIcon(brandenburg_virus, 0);
  scaleIcon(sachsenanhalt_virus, 0);
  scaleIcon(rheinlandpfalz_virus, 0);
  scaleIcon(sachsen_virus, 0);
}
