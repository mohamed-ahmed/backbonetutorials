define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'models/AppModel',
  'collections/AppsCollection',
  'views/AppsListView',
  'text!templates/appsTemplate.html',
  'Utils'
  ], function($, _, Backbone, SidebarView, AppModel, AppsCollection, AppsListView, appsTemplate, Utils){

    var preLoadedSites = {};

    var AppsView = Backbone.View.extend({
      el: $("#mostVisited_div"),
      render: function(){
        $('.menu li').removeClass('active');
        $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
        this.$el.html(appsTemplate);

        var topSites;
        var apps = [];

        function get(key){
          chrome.storage.local.get(key, function(value) {
            preLoadedSites[key] = value;
            console.log("getting: " + key);
            console.log(value[key]);
            console.log(" loaded");
          });
        }



        chrome.topSites.get(function(localTopSites){
          topSites = localTopSites;
        //console.log("topSites: ");
        //console.log(topSites);
        topSites.forEach(function (elem){
          //get("site")
          get( Utils.stripUrl( elem.url) );
          if(preLoadedSites[elem.url]){
            elem.imageUrl = preLoadedSites[elem.url];
          }
          else{
            elem.imageUrl = null;
          }
          apps.push(new AppModel(elem));
        });

        var appsCollection = new AppsCollection(apps);  
        var appsListView = new AppsListView({ collection: appsCollection}); 
        
        appsListView.render(); 

      });





        

      // add the sidebar 
      var sidebarView = new SidebarView();
      sidebarView.render();

    }
  });

return AppsView;
});
