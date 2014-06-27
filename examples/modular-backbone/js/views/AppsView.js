define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'models/AppModel',
  'models/BackgroundModel',
  'collections/AppsCollection',
  'views/AppsListView',
  'views/BackgroundView',
  'text!templates/appsTemplate.html',
  'Utils'
  ], function($, _, Backbone, SidebarView, AppModel, BackgroundModel, AppsCollection, AppsListView, BackgroundView, appsTemplate, Utils){

    var appsCollection;
    var AppsView = Backbone.View.extend({
      el: $("#mostVisited_div"),
      render: function(){


        var appViewStartedTime = (new Date()).getTime();

        console.log("appsView called at: " + appViewStartedTime );
        console.log("took: " + (appViewStartedTime-started) + " miliseconds");


        $('.menu li').removeClass('active');
        $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
        this.$el.html(appsTemplate);

        var topSites;
        var apps = [];
        var appsCollection = new AppsCollection(apps);
        var appsListView = new AppsListView({ collection: appsCollection}); 
        appsListView.render();   



        /*function get(key){
          chrome.storage.local.get(key, function(value) {
            preLoadedSites[key] = value;
            console.log("getting: " + key);
            console.log(value[key]);
            console.log(" loaded");
          });
        }*/

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

      $("#add-app-icon").click(function(){
        $('#myModal').modal();
      });

      var elem = $("#settingsModal");

      $("#settings-icon").click(function(){
        $('#settingsModal').modal();
        
        var  drop = $("#my-awesome-dropzone").clone();
        $("#input-background-image").append(drop);
        drop.dropzone( 
          {
            url:"#", 
            maxFiles : 1,
            thumbnailWidth : 100,
            thumbnailHeight : 100,
            init : function(){
              this.on("thumbnail", function(file, dataUrl) { 
                console.log("thumbnail loaded");
                console.log(dataUrl);
                thumbnailUrl = dataUrl;
                this.options.clickable = false;
              });

              this.on("success", function(file) { 
                console.log("image loadeded successfully");
                console.log(file);
                this.options.clickable = false;
              });

            }
          }


        );

        elem.find("#my-awesome-dropzone").show();




        $("#my-awesome-dropzone").ready(function(){
          drop.on("thumbnail", function(dataUrl) {
            console.log("processing");
          });
        });

        $("#settings-close-button").click(function(){
          var backgroundImageUrl = $("#input-backround-image-url").val()
          if(backgroundImageUrl.length > 0){
            backgroundModel.set("url", backgroundImageUrl);
          }
          elem.find("#my-awesome-dropzone").remove();
        });


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


      var currentBackground = { url : $("#page-background").css("background-image").split("url(")[1].split(")")[0] };
      var backgroundModel = new BackgroundModel( currentBackground );
      console.log(backgroundModel);
      var backgroundView = new BackgroundView({model : backgroundModel});
      backgroundView.render();

    }
  });

return AppsView;
});
