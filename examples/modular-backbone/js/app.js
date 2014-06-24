chrome.storage.local.get("background", function(object){
  var bgImageUrl = object["background"];
  document.body.style.backgroundImage = "url(" + bgImageUrl + " )"
});

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
