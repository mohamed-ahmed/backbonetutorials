define([
	'underscore',
	'backbone',
	'Utils',
	'Sync'
	], function(_, Backbone, Utils, Sync) {

		var AppModel = Backbone.Model.extend({

			initialize: function(){
				var model = this;

				model.on("change", function(){
					if(model.hasChanged("imageUrl")){
						console.log("\n\nimage url changed\n\n");
					}
				});

				var key = Utils.stripUrl(model.attributes.url);
				/*chrome.storage.local.get(key, function(value) {
					//preLoadedSites[key] = value;
					if(value[key]){
						model.set( { "imageUrl" :  value[key].imageUrl } );
					}
					else if(!model.attributes.imageUrl){
						model.attributes.deleted = false;
						Utils.getBestImageURL(model.attributes.url, function (imageUrl){
							model.set({"imageUrl" : imageUrl });
							console.log("AppModel: ")
							console.log(model);
							Utils.imgToDataURL(imageUrl, function(err, resultString){
								console.log("base64 url: ");
								console.log(resultString);
								model.attributes.imageUrl = resultString;
								Utils.save( Utils.stripUrl( model.attributes.url ), model.attributes);
							});
						} );
					}


					console.log("getting: " + key);
					console.log(value[key]);
					console.log(" loaded");
				});*/

			if(!model.attributes.imageUrl){
				model.attributes.deleted = false;
				Utils.getBestImageURL(model.attributes.url, function (imageUrl){
					model.set({"imageUrl" : imageUrl });
					console.log("AppModel: ")
					console.log(model);
					Utils.imgToDataURL(imageUrl, function(err, resultString){
						console.log("base64 url: ");
						console.log(resultString);
						model.attributes.imageUrl = resultString;
						Utils.save( Utils.stripUrl( model.attributes.url ), model.attributes);
					});
				} );
			}

				
				
			},

			sync : Sync.sync

			



		});

		return AppModel;

	});
