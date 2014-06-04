
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
	 				model.set( {deleted:true} );
	 				Utils.save( Utils.stripUrl(model.get("url")),  model.attributes, function(){
	 					console.log("model deleted")} );
	 				break;
 				default:
 			}
 		}

 		




		return Sync;

	});

