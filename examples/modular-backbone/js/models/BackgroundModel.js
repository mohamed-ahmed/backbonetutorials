define([
	'underscore',
	'backbone',
	'Utils',
	'BackgroundSync'
	], function(_, Backbone, Utils, BackgroundSync) {

		var BackgroundModel = Backbone.Model.extend({

			initialize: function(){
				var model = this;


				model.on("change", function(){
					model.sync("update", model);
					console.log("background model has changed");
					/*if(model.hasChanged("url")){
					}*/
				});



				
				
			},

			sync : BackgroundSync.sync

			



		});

		return BackgroundModel;

	});
