define([
	'underscore',
	'backbone',
	'Utils'
	], function(_, Backbone, Utils) {

		var AppModel = Backbone.Model.extend({

			initialize: function(){
				var model = this;

				model.on("change", function(){
					if(model.hasChanged("imageUrl")){
						console.log("\n\nimage url changed\n\n");
					}
				});

				if(!model.attributes.imageUrl){
					Utils.getBestImageURL(this.attributes.url, function (imageUrl){
						model.set({"imageUrl" : imageUrl });
						console.log("AppModel: ")
						console.log(model);
						Utils.imgToDataURL(imageUrl, function(err, resultString){
							console.log("base64 url: ");
							console.log(resultString);
							model.attributes.imageUrl = resultString;
							save(model.attributes.url, model.attributes);
						});
					} );
				}
			

				function save(key, value){
					chrome.storage.sync.set({key: value}, function() {
				        console.log(value);
				        console.log(' saved');
			        });
				}

			}

			



		});

		return AppModel;

	});
