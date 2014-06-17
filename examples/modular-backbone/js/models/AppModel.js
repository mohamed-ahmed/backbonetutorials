define([
	'underscore',
	'backbone',
	'Utils',
	'Sync'
	], function(_, Backbone, Utils, Sync) {

		var AppModel = Backbone.Model.extend({

			initialize: function(){
				var model = this;

				model.attributes.uniquePageUrl = Utils.getUniquePage( model.attributes.url );

				model.on("change", function(){
					if(model.hasChanged("imageUrl")){
						//console.log("\n\nimage url changed\n\n");
					}
				});
				var key = Utils.getUniquePage(model.attributes.url);


				if(!model.attributes.imageUrl){
					console.log("no image");
					model.attributes.deleted = false;
					Utils.getBestImageURL(model.attributes.url, function (imageUrl){
						model.set({"imageUrl" : imageUrl });
						//console.log("AppModel: ")
						//console.log(model);
						Utils.imgToDataURL(imageUrl, function(err, resultString){
							//console.log("base64 url: ");
							//console.log(resultString);
							model.attributes.imageUrl = resultString;
							Utils.saveLocal(  Utils.getUniquePage (model.attributes.url ), model.attributes);
							if(model.attributes.custom){
								Utils.addToLocalSiteCollection("savedSites", model.attributes);
							}
						});
					} );
				}

				
				
			},

			sync : Sync.sync

			



		});

		return AppModel;

	});
