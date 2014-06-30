
/* For SettingsModel to override Backbone.sync
 *
 */


 define([
 	'underscore',
 	'backbone',
 	'Utils'
 	], function(_, Backbone, Utils) {

	SettingsSync = {};

	SettingsSync.sync = function(method, model, options){
		switch(method){
			case "delete":

			break;

			case "update":
			console.log("model being updated");
			/*Utils.saveLocal( "settings",  model.attributes, function(){
				console.log("model saved")} );*/
 			model.attributes.backgroundModel.sync("update", model.attributes.backgroundModel);
			break;

			default:
		}
	}


	return SettingsSync;

});

