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

    var appsCollection;
    var AppsView = Backbone.View.extend({
      el: $("#mostVisited_div"),
      render: function(){
        $('.menu li').removeClass('active');
        $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
        this.$el.html(appsTemplate);

        var topSites;
        var apps = [];


        /*function get(key){
          chrome.storage.local.get(key, function(value) {
            preLoadedSites[key] = value;
            console.log("getting: " + key);
            console.log(value[key]);
            console.log(" loaded");
          });
        }*/

        var _preLoadedSites = [];
        var uniquePages = [];
        chrome.storage.local.get("savedSites", function(value){
          if(!value["savedSites"]){
            console.log("no saved sites");
            var collection = [];
            Utils.save("savedSites", collection);
          }
          else{
            _preLoadedSites = value["savedSites"];
            //console.log("preLoadedSites: ");
            //console.log(_preLoadedSites);
          }


          var numSites;
          var count = 0;

          chrome.topSites.get(function(localTopSites){
            //console.log("got sites at: " + (new Date()).getTime());

            localTopSites = localTopSites.concat(_preLoadedSites);
            
            console.log("preLoadedSites: ");
            console.log(_preLoadedSites);
            console.log("localTopSites: ");
            console.log(localTopSites);

            numSites = localTopSites.length;

            localTopSites.forEach(function (elem){
              elem.imageUrl = null;
              var key = Utils.stripUrl(elem.url);
              chrome.storage.local.get(key, function(value) {
                count++;
                if(value[key]){
                  if(!value[key].deleted){
                    //console.log(value[key]);
                    //console.log(" not deleted");
                    if(value[key].imageUrl){
                      elem = value[key];
                    }
                    apps.push(new AppModel(elem));
                    uniquePages.push( Utils.getUniquePage(elem.url) );
                  }

                }
                else{
                  apps.push(new AppModel(elem));
                  uniquePages.push( Utils.getUniquePage(elem.url) );
                }
                if(count == numSites){
                  console.log("count: ");
                  console.log(count);
                  appsCollection = new AppsCollection(apps);  
                  var appsListView = new AppsListView({ collection: appsCollection}); 

                  appsListView.render(); 
                }
              });
            });

          });

        });

      $("#add-app-icon").click(function(){
        $('#myModal').modal();
      });

      //var prefixList = ["www.", "//www.", "http://www."]
      $("#save-new-site-button").click(function(){
        var newTitle = $("#input-title").val();  
        var newUrl = $("#input-url").val();
        if(newTitle && newUrl){
          var existingObj = [];
          
          if(uniquePages.indexOf(Utils.getUniquePage(newUrl)) < 0 ){
            if( newUrl.indexOf("http://")!=0 ){
              newUrl = "http://" + newUrl;
            }
            var newSiteObj = {
              title : newTitle,
              url : newUrl,
              imageUrl : null,
              deleted : false,
              custom : true
            };
            var newApp = new AppModel(newSiteObj);
            appsCollection.add(newApp);
          }
        }      
      });    

    }
  });

return AppsView;
});
