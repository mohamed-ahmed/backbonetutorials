define([
  'underscore',
  'backbone',
  'models/AppModel',
  'text!templates/appTemplate.html'
], function(_, Backbone, AppModel, appTemplate){    
    
    console.log("app view called");

    var AppView = Backbone.View.extend({

        template : _.template(appTemplate),

        render : function() {
          //console.log("render called");
          //console.log("this.model: ");
          //console.log(this.model);
          this.$el.html(this.template(this.model.attributes));
          var model = this.model;
          var $el = this.$el;

          var elem = this.$el.find("#icon");


          model.on("change", function(){
            if(model.hasChanged("imageUrl")){
              console.log("\n\nimage url changed\n\n");
              elem.find("#icon-img").attr("src", model.get("imageUrl"));
            }
          });

          //console.log("this.el: ");
          //console.log(this.el);

          console.log(elem[0]);
          $("#mostVisited_div").append(elem);

          return this;
        }
        
    });

    return AppView;

}); 