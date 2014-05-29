define([
	'underscore',
	'backbone',
	'Utils'
	], function(_, Backbone, Utils) {

		var AppModel = Backbone.Model.extend({

			initialize: function(){
				var model = this;
				Utils.getBestImageURL(this.attributes.url, function (imageUrl){
					model.attributes.imageUrl = imageUrl;
					console.log("AppModel: ")
					console.log(model);
				} );
			}



		});

	return AppModel;

});
