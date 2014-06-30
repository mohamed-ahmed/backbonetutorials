
/* For BackgroundModel to override Backbone.sync
 *
 */


 define([
 	'underscore',
 	'backbone',
 	'Utils'
 	], function(_, Backbone, Utils) {

 		BackgroundSync = {};

 		BackgroundSync.sync = function(method, model, options){
 			switch(method){
 				case "delete":
	 				
	 				break;

	 			case "update":
	 				console.log("model being updated");
	 				Utils.saveLocal( "background",  model.attributes.url, function(){
	 					console.log("model saved")} );
	 				break;

 				default:
 			}
 		}

 		




		return BackgroundSync;

	});

