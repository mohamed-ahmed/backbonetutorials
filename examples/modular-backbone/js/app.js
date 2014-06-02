console.log("app started " + (new Date()).getTime() );
var preLoadedSites = {};

chrome.topSites.get(function(localTopSites){
  console.log("got top sites at: " + (new Date()).getTime());
}); 

function get(key){
  chrome.storage.local.get(key, function(value) {
    preLoadedSites[key] = value;
    console.log("getting: " + key);
    console.log(value[key]);
    console.log(" loaded");
  });
}


// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'router', // Request router.js
  ], function($, _, Backbone, Router){
    var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
