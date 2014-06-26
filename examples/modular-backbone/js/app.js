chrome.storage.local.get("background", function(object){
  var bgImageUrl = object["background"];
  //document.body.style.backgroundImage = "url(" + bgImageUrl + " )";
  $("#page-background").css("background-image",  "url(" + bgImageUrl + " )" );
});

/*var bgImageUrl = readCookie("background");

$("#page-background").css("background-image",  "url(" + bgImageUrl + " )" );*/

console.log("app started " + (new Date()).getTime() );

chrome.topSites.get(function(localTopSites){
  console.log("got top sites at: " + (new Date()).getTime());
}); 




// Filename: app.js
define([
  'jquery', 
  'bootstrap',
  'underscore', 
  'backbone',
  'router', // Request router.js
  ], function($, bootstrap, _, Backbone, Router){
    var initialize = function(){
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