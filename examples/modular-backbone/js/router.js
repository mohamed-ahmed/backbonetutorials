// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/projects/ProjectsView',
  'views/contributors/ContributorsView',
  'views/footer/FooterView',
  'views/AppsView'
], function($, _, Backbone, HomeView, ProjectsView, ContributorsView, FooterView, AppsView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'projects': 'showProjects',
      'users': 'showContributors',
      'apps': 'showApps',

      // Default
      '*actions': 'showApps'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    


    app_router.on('route:showApps', function () {
    
        console.log("show apps called at: " + (new Date()).getTime() );
        /*var appsView = new AppsView();
        appsView.render();*/

    });


    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
    //var footerView = new FooterView();

    Backbone.history.start();
    
  };
  return { 
    initialize: initialize
  };
});
