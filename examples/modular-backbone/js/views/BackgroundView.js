define([
  'underscore',
  'backbone',
  'blurjs',
  'models/AppModel',
  'text!templates/appTemplate.html',
  'AppSync',
  'views/EditView'
  ], function(_, Backbone, blurjs, AppModel, appTemplate, AppSync, EditView){    

    console.log("background view called");

    var BackgroundView = Backbone.View.extend({

      el : $("#page-background"),

      render : function() {
        console.log(this);

        $el = this.$el;

        var model = this.model

        model.on("change", function(){
          if(model.hasChanged("url")){
            console.log("url has changed");
            console.log(model.get("url"));
            console.log($el);
            $el.css("background-image", "url(" + model.attributes.url +  ")" );
          }
          if(model.hasChanged("type")){
            console.log("type has changed");
            if(model.type == "image"){
              $el.css("background-repeat", "no-repeat");
              $el.css("background-position", "center");
              $el.css("background-size", "cover");
            }
            if(model.get("type") == "tile"){
              console.log("background type = tile");
              $el.css("background-repeat", "repeat");
              $el.css("background-attachment", "none");
              $el.css("background-position", "initial");
              $el.css("background-size", "initial");
              $el.css("-webkit-filter", "initial");
              $(".myIcon").blurjs({
                source: '#page-background',
                radius: 5,
                draggable : true,
                overlay: 'rgba(255,255,255,0.4)'
              });
            }
          }
        });
  

        

        console.log("BackgroundView: ");
        console.log(model);

          return this;
        }
        
      });

return BackgroundView;

}); 