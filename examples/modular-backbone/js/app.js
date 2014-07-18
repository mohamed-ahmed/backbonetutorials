chrome.storage.local.get("background", function(object){
  var bgImage = object["background"];
  if(!bgImage){
    var background = {};
    chrome.storage.local.set({"background" : background}, function(){
      console.log("initializing background store")
    });
  }
  else if(bgImage.url && bgImage.type){
    //document.body.style.backgroundImage = "url(" + bgImageUrl + " )";
    $("#page-background").css("background-image",  "url(" + bgImage.url + " )" );
    console.log("background image assigned");

    if(bgImage.type == "image"){
      $("#page-background").css("background-repeat", "no-repeat");
      $("#page-background").css("background-position", "center");
    }
    if(bgImage.type == "tile"){
      console.log("background type = tile");
      $("#page-background").css("background-repeat", "repeat");
      $("#page-background").css("background-attachment", "none");
      $("#page-background").css("background-position", "initial");
      $("#page-background").css("background-size", "initial");
      $("#page-background").css("-webkit-filter", "initial");
      /*$(".myIcon").ready(function(){
          $(".myIcon").blurjs({
            source: '#page-background',
            radius: 7,
            draggable : true,
            overlay: 'rgba(255,255,255,0.4)'
          });
      });*/
    }
  }

});

/*var bgImageUrl = readCookie("background");

$("#page-background").css("background-image",  "url(" + bgImageUrl + " )" );*/

var started = (new Date()).getTime();
console.log("app started " + started );

var timeGotSites;

chrome.topSites.get(function(localTopSites){
  timeGotSites = (new Date()).getTime();
  console.log("got top sites at: " + timeGotSites );
  console.log("took: " + (timeGotSites-started) + " miliseconds");
}); 




// Filename: app.js
define([
  'jquery', 
  'bootstrap',
  'underscore', 
  'backbone',
  'router', // Request router.js
  'views/AppsView'
  ], function($, bootstrap, _, Backbone, Router, AppsView){
    var initialize = function(){

    timeAppjsStarted = (new Date()).getTime();
    console.log("timeAppjsStarted took: " + (timeAppjsStarted-started) + " miliseconds");

    var appsView = new AppsView();
    appsView.render();
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});


  /*
  creates cookies
  @param {String} name -  of coookie
  @param {String} valie - value of coookie
  @param {number} days -  number of days for coookie to stay active
  */
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

  /*
  creates cookies
  @param {String} name -  of coookie
  @return {String} valie - value of coookie
  */

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

  /*
  * erases cookies
  * @param {String} name -  of coookie
  */
function eraseCookie(name) {
  createCookie(name,"",-1);
}