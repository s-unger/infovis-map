var width = 500,
                height = 620,
                focused = null,
                geoPath;
                bayern=null;
                trendListAverage=null;
                trendList=null;
                map_calendarweek=0;
                map_year=0;
                
            
            var svg = d3.select(".tempcenter")
              .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("align","center");
            
            svg.append("rect")
                .attr("class", "background")
                .attr("width", width)
                .attr("height", height);
            
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
                    .translate([width/2,height/2])
                    .center(center),
                    
                  bottomLeftPx = projection(bottomLeft),
                  topRightPx = projection(topRight),
                  scaleFactor = 1.00*Math.min(width/(topRightPx[0]-bottomLeftPx[0]), height/(-topRightPx[1]+bottomLeftPx[1])),
                  
                  projection = d3.geo.albers()
                    .parallels([bottomLeft[1],topRight[1]])
                    .rotate([rotLong,0,0])
                    .translate([width/2,height/2])
                    .scale(scaleFactor*0.975*1000)
                    .center(center);
            
              geoPath = d3.geo.path().projection(projection);
                
              var graticule = d3.geo.graticule()
                  .step([1, 1]);
            
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
                    console.log("checked");
                    colorBL();
                } else {
                    console.log("not checked");	
                    adaptColor(12);
                }	
            }
            function colorBL() {

                //console.log(trendListAverage);
                trendListAverage.forEach(function (arrayItem) {
                var valueBL = arrayItem.Value;
                var nameBL = arrayItem.Kategorie;
                console.log(nameBL);
                //console.log(valueBL);
                if (nameBL=="Baden-Württemberg"){
                    console.log(valueBL);
                    g.select("#baden").style("fill", getcolor(valueBL));
                }
                if (nameBL=="Bayern"){
                    console.log(valueBL);
                    g.select("#bayern").style("fill", getcolor(valueBL));
                }
                if (nameBL=="Berlin"){
                    console.log(valueBL);
                    g.select("#berlin").style("fill", getcolor(valueBL));
                }   
                if (nameBL=="Sachsen"){
                    console.log(valueBL);
                    g.select("#sachsen").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Nordrhein-Westfalen"){
                    console.log(valueBL);
                    g.select("#nrw").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Thüringen"){
                    console.log(valueBL);
                    g.select("#thüringen").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Bremen"){
                    console.log(valueBL);
                    g.select("#bremen").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Sachsen-Anhalt"){
                    console.log(valueBL);
                    g.select("#sachsen-anhalt").style("fill", getcolor(valueBL));
                } 
                if (nameBL=="Rheinland-Pfalz"){
                    console.log(valueBL);
                    g.select("#rheinland").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Schleswig-Holstein"){
                    console.log(valueBL);
                    g.select("#schleswig").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Niedersachsen"){
                    console.log(valueBL);
                    g.select("#niedersachsen").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Hessen"){
                    console.log(valueBL);
                    g.select("#hessen").style("fill", getcolor(valueBL));
                }  
                if (nameBL=="Hamburg"){
                    console.log(valueBL);
                    g.select("#hamburg").style("fill", getcolor(valueBL));
                } 
                if (nameBL=="Saarland"){
                    console.log(valueBL);
                    g.select("#saarland").style("fill", getcolor(valueBL));
                } 
                if (nameBL=="Mecklenburg-Vorpommern"){
                    console.log(valueBL);
                    g.select("#mecklenburg").style("fill", getcolor(valueBL));
                }
                if (nameBL=="Brandenburg"){
                    console.log(valueBL);
                    g.select("#brandenburg").style("fill", getcolor(valueBL));
                }   
                });
             
            }
            function getcolor(value) {
            console.log(value);
            if (value<10){
                console.log("1");
            return "rgb(28, 234, 227)";
            }

            if (value<30 && value>19){
                console.log("2");
                return "rgb(105, 210, 152)";
                
            }
            if (value<40 && value>29){
                console.log("3");
                return "rgb(170, 189, 89)";
                
            }
            if (value<50 && value>39){
                console.log("4");
                return "rgb(203, 178, 57)";
                
            }
            if (value<60&& value>49){
                console.log("5");
                return "rgb(236, 168, 25)";
                
            }
            if (value<70&& value>59){
                console.log("6");
                return "rgb(249, 123, 11)";
                
            }
            if (value<80&& value>69){
                console.log("7");
                return "rgb(251, 90, 8)";
                
            }
            if (value<90&& value>79){
                console.log("8");
                return "rgb(252, 57, 5)";
            
            }
            if (value>89){
                console.log("9");
                return "rgb(255, 0, 0)";
                
            }
           
            }
            function getTrendValueAverage(){

            d3.csv("klopapier.csv", function(data) {

            data.forEach(function(d) {
            d['Value'] = +d['Value'];
            });
            trendListAverage= data;
            console.log("average");	
            //console.log(trendListAverage);
            //console.log(trendListAverage[0]);

            });
            
            };
            function getTrendValue(){
            
            var wordData= "allBLKlopapier.csv";

            d3.csv(wordData, function(data) {

            data.forEach(function(d) {
            d['Baden'] = +d['Baden'];
            d['Bayern'] = +d['Bayern'];
            d['Berlin'] = +d['Berlin'];
            d['Brandenburg'] = +d['Brandenburg'];
            d['Bremen'] = +d['Bremen'];
            d['Hamburg'] = +d['Hamburg'];
            d['Mecklenburg'] = +d['Mecklenburg'];
            d['Niedersachen'] = +d['Niedersachen'];
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
            console.log(trendList);
            console.log(trendList[0]);
            (1);
            console.log("not average");	
            });
            
            };
            function adaptColor(week){
            trendList.forEach(function (d, i) {
                if (i==week){
                //colorBL2(d);
                g.select("#bayern").style("fill", getcolor(d.Bayern));
                g.select("#berlin").style("fill", getcolor(d.Berlin));
                g.select("#bremen").style("fill", getcolor(d.Bremen));
                g.select("#brandenburg").style("fill", getcolor(d.Brandenburg));
                g.select("#hamburg").style("fill", getcolor(d.Hamburg));
                g.select("#hessen").style("fill", getcolor(d.Hessen));
                g.select("#mecklenburg").style("fill", getcolor(d.Mecklenburg));
                g.select("#niedersachsen").style("fill", getcolor(d.Niedersachen));
                g.select("#nrw").style("fill", getcolor(d.Nordrhein));
                g.select("#rheinland").style("fill", getcolor(d.Rheinland));
                g.select("#saarland").style("fill", getcolor(d.Saarland));
                g.select("#sachsen").style("fill", getcolor(d.Sachsen));
                g.select("#schleswig").style("fill", getcolor(d.Schleswig));
                g.select("#thüringen").style("fill", getcolor(d.Thüringen));
                g.select("#baden").style("fill", getcolor(d.Baden));
                g.select("#sachsen-anhalt").style("fill", getcolor(d.SachsenA));
                }
            
            });
            }

            function updateMapTime(text_week) {
                map_calendarweek = parseInt(text_week.slice(3, 5));
                map_year = parseInt(text_week.slice(6, 10));
                adaptColor(map_calendarweek);
                
              }

                        
            
            function clickPath(d) {
              var x = width/2,
                  y = height/2,
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
                  .attr("transform", "translate("+ (width/2) +","+ (height/2) +")scale("+ k +")translate("+ (-x) +","+ (-y) +")")
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
