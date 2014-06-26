define([
  'underscore',
  'backbone',
  'models/AppModel',
  'text!templates/appTemplate.html',
  'AppSync',
  'views/EditView'
  ], function(_, Backbone, AppModel, appTemplate, AppSync, EditView){    

    console.log("app view called");

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
        });

        console.log("BackgroundView: ");
        console.log(model);

          return this;
        }
        
      });

return BackgroundView;

}); 