# infovis-map
University project for creating an information visualisation about corona and news articles.
The goal of this project is to hit a more lighthearted note involving the often frightening visualisations of the Covid19 developments. We want to show other interesting and entertaining data from the years 2019 and 2020 and invite to analyse their development in the context of the virus outbreak and make fascinating discoveries.
We have made a preselection of funny keywords from google trends and explore with a movable time-slider where and when in Germany these terms have been searched for. Additionally we provide a selection of news articles relating to that keywords in the given timeframe, that can be directly accessed via links. At the same time, virus-icons on the German map visualise the current Corona situation by this point per region. <br/><br/>


Hosted on this site: https://s-unger.github.io/infovis-map/ <br/><br/>

![Preview of our site](/img/preview_new.png)<br/>

## Key features:
* ### Central control panel
  Includes dropdown menus to select the desired year(s), the google trends key words and a time slider that controls all data displayed per calendar week.
  * all data displayed synchronises to that time slider
  * 2019, 2020 or both years are available as time period in dropdown
  * slider adjusts to selected year from dropdown
  * two keywords can be selected <br/><br/>
  
  <img src="/img/kontrollleiste.png" width="100%"> <br/><br/>

* ### German map
  As a background to geographically visualise our data, we included a map of Germany with seperated regiond. 
  * synchronises with time-slider
  * synchronises with first keyword from dropdown
  * regions are coloured differently depending on the popularity of the search term in that region
  * a colour legend shows via a hover function what the different colours represent
  * zoom on state is possible
  * average value per state within the chosen time period can be toggled
  * size of virus-icon on each state symbolise corona-cases in that state 
  * when hovering over a state, the number of corona infections and also the value of the google trend keyword to the corresponding state are displayed <br/><br/>
  
  <p align="center">
    <img src="/img/map_new.png" width="70%">
  </p> <br/><br/>
  
* ### Graphs of google trends
  Via two dropdown menus two keywords can be selected to inspect.
  * by hovering over the "?"-icon the displayed values are explained
  * data is shown in relation to the date with the highest search requests on a keyword within the given time
  * Google trends of two selected keywords can be compared to each other
  * second time slider that can be moved independently from the other one, to quickly inspect the exact search % per week <br/><br/>
  
   <p align="center">
    <img src="/img/graph_new.png" width="70%">
  </p> <br/><br/>

  
* ### Newsarticles
  Contains scraped newsarticles relating to both selected keywords in the calendar week of the primary time-slider
  * correspond to both keywords
  * article titles are shown including a short extract, date and publishing source
  * article itself is linked within a uni database <br/><br/>
  
  <p align="center">
    <img src="/img/articles_new.png" width="70%">
  </p> <br/><br/>

* ### Wordcloud
  For an extra visually appealing touch and seeing the search terms relatively to each other
  * shows all keywords
  * size of each keyword represents how popular that search term was in the calendar week selected via the primary time slider
  * keywords are clickable and update the dropdown menu (keyword 1) above the graphs <br/><br/>
  
  <p align="center">
    <img src="/img/wordcloud_new.png" width="70%">
  </p>
