define([
  'underscore',
  'backbone',
  'models/BackgroundModel',
  'views/BackgroundView'
  ], function(_, Backbone, BackgroundModel, BackgroundView){    

    console.log("background view called");

    var SettingsView = Backbone.View.extend({


      render : function() {
        console.log(this);



        var $el = this.$el;
        console.log($el);

        el = this.el;

        var model = this.model

        model.on("change", function(){
          if(model.hasChanged("url")){
            console.log($el);
          }
        });

        console.log("SettingsView: ");
        console.log(model);

        chrome.storage.local.get("background", function(object){
          var bgImage = object["background"];
          var currentBackground = { url : $("#page-background").css("background-image").split("url(")[1].split(")")[0], type : "null" };
          if(bgImage.type){
            currentBackground.type = bgImage.type;
          }
          var backgroundModel = new BackgroundModel( currentBackground );
          this.backgroundModel = backgroundModel;
          console.log(backgroundModel);
          var backgroundView = new BackgroundView({model : backgroundModel});
          backgroundView.render();

          $el.on('hidden.bs.modal', function(){
            console.log("modal closed");
            var backgroundImageUrl = $("#input-backround-image-url").val();
            var backgroundTileUrl = $("#input-backround-tile-url").val();
            if(backgroundImageUrl.length > 0){
              backgroundModel.set("url", backgroundImageUrl);
              backgroundModel.set("type", "image");
            }
            else if(backgroundTileUrl.length > 0){
              backgroundModel.set("url", backgroundTileUrl);
              backgroundModel.set("type", "tile");
            }

          });

        });

        var elem = $("#settingsModal");



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

        return this;

      }, 

      modal : function(){
        var elem = $("#settingsModal");
        console.log("settings view modal called");
        elem.modal();
      }

    });


return SettingsView;

}); 