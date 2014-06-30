define([
  'underscore',
  'backbone',
  'dropzone',
  'models/AppModel',
  'text!templates/appTemplate.html',
  'AppSync',
  'views/EditView'
  ], function(_, Backbone, Dropzone, AppModel, appTemplate, AppSync, EditView){    

    console.log("app view called");

    var AppView = Backbone.View.extend({

      template : _.template(appTemplate),

      render : function() {


          this.$el.html(this.template(this.model.attributes));
          var model = this.model;
          var $el = this.$el;

          var elem = this.$el.find(".myIcon");

          //var myDropzone = new Dropzone("div#myId", { url: "/file/post"});


          model.on("change", function(){
            if(model.hasChanged("imageUrl")){
              //console.log("\n\nimage url changed\n\n");
              elem.find("#icon-img").attr("src", model.get("imageUrl"));
            }
            if(model.hasChanged("title")){
              console.log("\n\t title url changed\n\n");
              elem.find(".url-text").text(model.get("title"));
            }

          });

          model.on("destroy", function(){
            console.log("AppView: model being deleted");
            elem.hide(300, function(){ 
              elem.remove(); 
            });
          });

          elem.find(".edit-app-icon").hover(
            function(){
              elem.attr({href : null });
            },
            function(){
              elem.attr({href : model.attributes.url});
            }
            )

          elem.find(".edit-app-icon").click(function(){

            console.log(model);
            var editView = new EditView({model:model , el : $("#edit-app-placeholder") });
            editView.render();

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