define([
	'underscore',
	'backbone',
	'Utils'
	], function(_, Backbone, Utils) {

		var AppModel = Backbone.Model.extend({

			initialize: function(){
				Utils.getBestImageURL(this.attributes.url );
			}



		});

	return AppModel;

});
