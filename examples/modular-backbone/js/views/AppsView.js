define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'models/AppModel',
  'collections/AppsCollection',
  'views/AppsListView',
  'text!templates/appsTemplate.html'
], function($, _, Backbone, SidebarView, AppModel, AppsCollection, AppsListView, appsTemplate){

  var AppsView = Backbone.View.extend({
    el: $("#mostVisited_div"),
    render: function(){
      $('.menu li').removeClass('active');
      $('.menu li a[href="'+window.location.hash+'"]').parent().addClass('active');
      this.$el.html(appsTemplate);

      var app0 = new AppModel({title: 'Cross Domain', url: 'https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/cross-domain'}); 
      var app1 = new AppModel({title:'Infinite Scroll', url: 'https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/infinite-scroll'}); 
      var app2 = new AppModel({title:'Modular Backbone', url: 'https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/modular-backbone'}); 
      var app3 = new AppModel({title:'Node MongoDB Mongoose Restify', url: 'https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/nodejs-mongodb-mongoose-restify'});
      var app4 = new AppModel({title:'Todo App', url: 'https://github.com/thomasdavis/backbonetutorials/tree/gh-pages/examples/todo-app'});

      var aApps = [app0, 
                      app1,
                      app2,
                      app3,
                      app4];

      var appsCollection = new AppsCollection(aApps);  
      var appsListView = new AppsListView({ collection: appsCollection}); 
      
      appsListView.render(); 

      // add the sidebar 
      var sidebarView = new SidebarView();
      sidebarView.render();

    }
  });

  return AppsView;
});
