define([
  'underscore',
  'backbone',
  ], function(_, Backbone){    

    console.log("background view called");

    var SettingsView = Backbone.View.extend({


      render : function() {
        console.log(this);



        $el = this.$el;

        var model = this.model

        model.on("change", function(){
          if(model.hasChanged("url")){
            console.log($el);
          }
        });

        console.log("SettingsView: ");
        console.log(model);

        $("#settings-close-button").click(function(){
          var backgroundImageUrl = $("#input-backround-image-url").val()
          if(backgroundImageUrl.length > 0){
            backgroundModel.set("url", backgroundImageUrl);
            backgroundModel.set("type", "image");
          }
          elem.find("#my-awesome-dropzone").remove();
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


        });

        return this;
      }, 

      modal : function(){
        this.el.modal();
      }

    });


return SettingsView;

}); 