define([
  'underscore',
  'backbone',
  'models/AppModel',
  'text!templates/appTemplate.html',
  'Sync'
  ], function(_, Backbone, AppModel, appTemplate, Sync){    

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
              //console.log("\n\nimage url changed\n\n");
              elem.find("#icon-img").attr("src", model.get("imageUrl"));
            }
          });

          elem.find(".remove-app-icon").hover(
            function(){
              elem.attr({href : null });
            },
            function(){
              elem.attr({href : model.attributes.url});
            }
            )

          elem.find(".remove-app-icon").click(function(){
            //console.log("clicked");
            var options = {};
            options.success = function(){
              //console.log("sucessful delete");
            };
            model.sync("delete", model, options);
            elem.hide(300, function(){ 
              elem.remove(); 
            })
          });

          //console.log("this.el: ");
          //console.log(this.el);

          //console.log(elem[0]);
          $("#mostVisited_div").append(elem);

          return this;
        }
        
      });

return AppView;

}); 