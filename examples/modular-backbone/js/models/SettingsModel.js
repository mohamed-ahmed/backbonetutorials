define([
	'underscore',
	'backbone',
	'Utils',
	'SettingsSync'
], function(_, Backbone, Utils, SettingsSync) {

	console.log("SettingsModel.js");
	var SettingsModel = Backbone.Model.extend({

		initialize: function(){
			var model = this;
			console.log("SettingsModel initialized");

			model.on("change", function(){
				console.log("settings model has changed");

			});
			
			
		},

		sync : SettingsSync.sync

		



	});

	return SettingsModel;

});
