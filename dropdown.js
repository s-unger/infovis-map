var keyword_1 = "corona"; //Dont use this. For internal use only. External please go to notify_keyword
var keyword_2 = "keines"

document.querySelector("#keyword1").onchange = function () {
   let msg = document.querySelector("#keyword1").value;
   if (keyword_2 = msg) {
     selectItemByValue(document.getElementById("keyword2"), "keines");
     notify_keyword_2_changed("keines");
   }
   keyword_1 = msg;
   notify_keyword_1_changed(msg);
}
document.querySelector("#keyword2").onchange = function () {
   let msg = document.querySelector("#keyword2").value;
   if (keyword_1 == msg) {
     selectItemByValue(document.getElementById("keyword2"), "keines");
     notify_keyword_2_changed("keines");
     alert("Keyword schon als Keyword 1 gewählt. Bitte anderes aussuchen.");
   } else {
     keyword_2 = msg;
     notify_keyword_2_changed(msg);
   }
}

//WANT THE CURRENT KEYWORD? PUT YOUR FUNCTION IN HERE
function notify_keyword_1_changed(keyword) {
  updateArticleKeyword(keyword);
}
function notify_keyword_2_changed(keyword) {

}

function selectItemByValue(elmnt, value){

  for(var i=0; i < elmnt.options.length; i++)
  {
    if(elmnt.options[i].value === value) {
      elmnt.selectedIndex = i;
      break;
    }
  }
}
