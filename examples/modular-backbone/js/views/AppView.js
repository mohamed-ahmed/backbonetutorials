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
            console.log("\n\nimage url changed\n\n");
            elem.find("#icon-img").attr("src", model.get("imageUrl"));
          }
          if(model.hasChanged("title")){
            console.log("\n\t title url changed\n\n");
            elem.find("#url-text").text(model.get("title"));
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

          $(elem).blurjs({
            source: 'body',
            radius: 7,
            draggable : true,
            overlay: 'rgba(255,255,255,0.4)'
          });

          /*$(elem).waitUntilExists(function(){
            console.log("elem loaded");
            //wait for background image to load
            var src = $('#page-background').css('background-image');
            var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
            console.log(url);

            var img = new Image();
            var loadAgain = true;
            img.onload = function() {
                console.log("image loaded");
                loadAgain = false;
                /*$(elem).blurjs({
                  source: '#page-background',
                  radius: 7,
                  draggable : true,
                  overlay: 'rgba(255,255,255,0.4)'
                });
                
            }
            img.src = url;
            if (img.complete && loadAgain){
              img.onload();
            }

          });*/

          return this;
        }
        
      });

return AppView;

}); 


(function ($) {

/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler A function to execute at the time when the element is inserted
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $(selector).waitUntilExists(function);
*/

$.fn.waitUntilExists    = function (handler, shouldRunHandlerOnce, isChild) {
    var found       = 'found';
    var $this       = $(this.selector);
    var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

    if (!isChild)
    {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
            window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
        ;
    }
    else if (shouldRunHandlerOnce && $elements.length)
    {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }

    return $this;
}

}(jQuery));