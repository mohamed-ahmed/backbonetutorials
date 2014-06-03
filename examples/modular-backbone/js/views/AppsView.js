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

        var numSites;
        var count = 0;

        chrome.topSites.get(function(localTopSites){
          console.log("got sites at: " + (new Date()).getTime());
          topSites = localTopSites;
          numSites = localTopSites.length;
          console.log("numSites: " + numSites);

          topSites.forEach(function (elem){
            elem.imageUrl = null;
            var key = Utils.stripUrl(elem.url);
            chrome.storage.local.get(key, function(value) {
              count++;
              if(value[key]){
                if(!value[key].deleted){
                  console.log(value[key]);
                  console.log(" not deleted");
                  if(value[key].imageUrl){
                    elem = value[key];
                  }
                  apps.push(new AppModel(elem));
                }

              }
              else{
                apps.push(new AppModel(elem));
              }
              if(count == numSites){
                console.log("count: ");
                console.log(count);
                var appsCollection = new AppsCollection(apps);  
                var appsListView = new AppsListView({ collection: appsCollection}); 

                appsListView.render(); 
              }
            });
          });

          

        });







      // add the sidebar 
      var sidebarView = new SidebarView();
      sidebarView.render();

    }
  });

return AppsView;
});
