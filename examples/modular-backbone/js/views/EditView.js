define([
  'underscore',
  'backbone',
  'dropzone',
  'models/AppModel',
  'text!templates/editModalTemplate.html',
  'Sync'
  ], function(_, Backbone, AppModel, Dropzone, editModalTemplate, Sync){    

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



          elem.find(".edit-app-icon").hover(
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

          elem.find("#save-site-button").click(function(){
            //console.log("clicked");
            var options = {};
            options.success = function(){
              //console.log("sucessful delete");
            };
            var newTitle = elem.find("#input-title").val();
            if(newTitle.length > 0 ){
              model.set("title", elem.find("#input-title").val());
            }
            /*model.set("url", elem.find("input-url").val());*/
            model.sync("update", model, options);
          });

          //console.log("this.el: ");
          //console.log(this.el);

          console.log(elem);
          var  drop = $("#my-awesome-dropzone").clone();
          elem.find("#input-image").append(drop);
          drop.dropzone();
          //drop.insertAfter(  elem.find(".form-horizontal")  ) 
          elem.find("#my-awesome-dropzone").show();



          elem.modal();



          return this;
        }
        
      });

return EditView;

}); 