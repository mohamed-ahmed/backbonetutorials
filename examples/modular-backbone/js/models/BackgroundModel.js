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

				});
				var key = Utils.getUniquePage(model.attributes.url);



				
				
			},

			sync : BackgroundSync.sync

			



		});

		return BackgroundModel;

	});
