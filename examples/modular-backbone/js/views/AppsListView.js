// Filename: views/apps/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'models/AppModel',
  'collections/AppsCollection',
  'text!templates/appsListTemplate.html',
  'views/AppView'

], function($, _, Backbone, AppModel, AppsCollection, appsListTemplate, AppView){
  var AppListView = Backbone.View.extend({
    el: $("#apps-list"),

    render: function(){


      var appRenderTime = (new Date()).getTime();

      console.log("apps rendered at: " + appRenderTime);

      console.log("took: " + (appRenderTime-started) + " miliseconds");
      
      var data = {
        apps: this.collection.models,
        _: _ 
      };

      console.log("apps: ");
      console.log(data.apps);

      this.collection.on("add", function (app){
        console.log(app);
        console.log(" app added");
        var appView = new AppView({model:app});
        appView.render();
      });

      _.forEach(data.apps, function (elem){
        //console.log(elem.attributes);


        var appView = new AppView({model:elem});
        //console.log("appView: ");
        //console.log(appView);
        appView.render();

      });



      //var compiledTemplate = _.template( appsListTemplate, data );
      //$("#apps-list").html( compiledTemplate ); 
    }
  });
  return AppListView;
});
