define([
	'underscore',
	'backbone'
	], function(_, Backbone) {

		var AppModel = Backbone.Model.extend({

			initialize: function(){
				this.getHTML();
			},

			getHTML : function(){
				var siteUrl = this.attributes.url;
				console.log(siteUrl);
				var html;
				var xhr = new XMLHttpRequest();
				xhr.open("GET", siteUrl, true);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						// JSON.parse does not evaluate the attacker's scripts.
						//var resp = JSON.parse(xhr.responseText);
						//console.log(xhr.responseText);
						html = $(xhr.responseText);
						//console.log(domObj);
					}
				}
				xhr.send();
			}



});

		return AppModel;

	});
