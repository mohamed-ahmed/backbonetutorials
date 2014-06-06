define([
  'underscore',
  'backbone',
  'models/AppModel',
  'text!templates/editModalTemplate.html',
  'Sync'
  ], function(_, Backbone, AppModel, editModalTemplate, Sync){    

    console.log("edit view called");

    var EditView = Backbone.View.extend({

      template : _.template(editModalTemplate),

      render : function() {
          //console.log("render called");
          //console.log("this.model: ");
          //console.log(this);
          console.log(this.model);
          this.$el.html(this.template(this.model.attributes));
          var model = this.model;


          var elem = this.$el.find("#editAppModal");



          elem.find(".remove-app-icon").hover(
            function(){
              elem.attr({href : null });
            },
            function(){
              elem.attr({href : model.attributes.url});
            }
          )

          elem.find("#delete-site-button").click(function(){
            //console.log("clicked");
            var options = {};
            options.success = function(){
              //console.log("sucessful delete");
            };
            model.sync("delete", model, options);
            
          });

          //console.log("this.el: ");
          //console.log(this.el);

          console.log(elem);
          //$(elem).insertAfter('#myModal');

          elem.modal();


          return this;
        }
        
      });

return EditView;

}); 