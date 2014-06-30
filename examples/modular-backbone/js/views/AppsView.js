define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'models/AppModel',
  'models/BackgroundModel',
  'models/SettingsModel',
  'collections/AppsCollection',
  'views/AppsListView',
  'views/BackgroundView',
  'views/SettingsView',
  'text!templates/appsTemplate.html',
  'Utils'
  ], function($, _, Backbone, SidebarView, AppModel, BackgroundModel, SettingsModel, AppsCollection, AppsListView, BackgroundView, SettingsView, appsTemplate, Utils){

    var appsCollection;
    var AppsView = Backbone.View.extend({
      el: $("#mostVisited_div"),
      render: function(){


        var appViewStartedTime = (new Date()).getTime();

        console.log("appsView called at: " + appViewStartedTime );
        console.log("took: " + (appViewStartedTime-started) + " miliseconds");


        this.$el.html(appsTemplate);

        var topSites;
        var apps = [];
        var appsCollection = new AppsCollection(apps);
        var appsListView = new AppsListView({ collection: appsCollection}); 
        appsListView.render();   




        var _preLoadedSites = [];
        //var uniquePages = [];
        chrome.storage.local.get("savedSites", function(value){
          if(!value["savedSites"]){
            console.log("no saved sites");
            var collection = [];
            Utils.saveLocal("savedSites", collection);
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
              var key = Utils.getUniquePage(elem.url);
              chrome.storage.local.get(key, function(value) {
                count++;
                if(value[key]){
                  var existingObj;
                  existingObj = appsCollection.findWhere({ uniquePageUrl : Utils.getUniquePage(elem.url) });
                  if(!value[key].deleted && !existingObj ){
                    //console.log(value[key]);
                    //console.log(" not deleted");
                    if(value[key].imageUrl){
                      elem = value[key];
                    }
                    var newApp = new AppModel(elem);
                    appsCollection.push(newApp);
                    //uniquePages.push( Utils.getUniquePage(elem.url) );
                  }

                }
                else{
                  var newApp = new AppModel(elem);
                  appsCollection.push(newApp);
                  //uniquePages.push( Utils.getUniquePage(elem.url) );
                }
                if(count == numSites){
                  console.log("count: ");
                  console.log(count);
                  /*var appsListView = new AppsListView({ collection: appsCollection}); 
                  appsListView.render(); */
                }
              });
            });

          });

        });

      
      var settingsModel = new SettingsModel();
      var settingsView = new SettingsView( { model : settingsModel, el : $("#settingsModal" ) } );
      settingsView.render();

      $("#settings-icon").click(function(){
        settingsView.modal();
      });


      $("#add-app-icon").click(function(){
        $('#myModal').modal();
      });



      $("#reload-icon").click(function(){
        chrome.topSites.get(function(localTopSites){
          localTopSites.forEach(function (elem){
            elem.imageUrl = null;
            var existingObj;
            existingObj = appsCollection.findWhere({ uniquePageUrl : Utils.getUniquePage(elem.url) });
            if(  !existingObj ){
              var newApp = new AppModel(elem);
              appsCollection.push(newApp);
            }
          });
        });
      });

      //var prefixList = ["www.", "//www.", "http://www."]
      $("#save-new-site-button").click(function(){
        var newTitle = $("#input-title").val();  
        var newUrl = $("#input-url").val();
        if(newTitle && newUrl){
          var existingObj;
          existingObj = appsCollection.findWhere({ uniquePageUrl : Utils.getUniquePage(newUrl) });
          if(  !existingObj ){
            if( newUrl.indexOf("http://")!=0 ){
              newUrl = "http://" + newUrl;
            }
            var newSiteObj = {
              title : newTitle,
              url : newUrl,
              uniquePageUrl : Utils.getUniquePage(newUrl),
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
