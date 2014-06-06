
/* For AppModel to override Backbone.sync
 *
 */


 define([
 	'underscore',
 	'backbone',
 	'Utils'
 	], function(_, Backbone, Utils) {

 		Sync = {};

 		Sync.sync = function(method, model, options){
 			switch(method){
 				case "delete":
	 				console.log("model being destroyed");
	 				model.collection.remove(model);
	 				model.set( {deleted:true} );
	 				Utils.save( Utils.getUniquePage(model.get("url")),  model.attributes, function(){
	 					console.log("model deleted")} );
	 				model.destroy();
	 				break;

	 			case "update":
	 				console.log("model being updated");
	 				//model.collection.remove(model);
	 				Utils.save( Utils.getUniquePage(model.get("url")),  model.attributes, function(){
	 					console.log("model saved")} );
	 				break;

 				default:
 			}
 		}

 		




		return Sync;

	});

