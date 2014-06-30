define([
	'underscore',
	'backbone',
	'Utils',
	'SettingsSync'
], function(_, Backbone, Utils, SettingsSync) {

	var SettingsModel = Backbone.Model.extend({

		initialize: function(){
			var model = this;


			model.on("change", function(){
				console.log("settings model has changed");

			});
			
			
		},

		sync : SettingsSync.sync

		



	});

	return SettingsModel;

});
