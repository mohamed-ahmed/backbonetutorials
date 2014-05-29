
/* Gets html from url
 *
 */

 var globalHTML;

 define([
 	'underscore',
 	'backbone',
 	], function(_, Backbone) {

 		Utils = {};

 		Utils.getHTML = function(url, callback){

 			var html;
 			var xhr = new XMLHttpRequest();
 			xhr.open("GET", url, true);
 			xhr.onreadystatechange = function(){
 				if (xhr.readyState == 4) {
 					console.log("getting html for: " + url);
					// JSON.parse does not evaluate the attacker's scripts.
					//var resp = JSON.parse(xhr.responseText);
					//console.log(xhr.responseText);

					html = $(xhr.responseText);
					var jqueryHTML = $.parseHTML(xhr.responseText);
					globalHTML = html;
					//console.log("finding...");
					//console.log(html.find('meta[property="og:image"]'));
					//console.log("html: ");
					//console.log(jqueryHTML);
					callback(html);
				}
			};
			xhr.send();

		};

		Utils.getBestImageURL = function(pageURL){

			this.getHTML(pageURL, function(jqueryHTML){

				var imageURL;
				for(var i = 0; i < jqueryHTML.length; i++){
					if((jqueryHTML[i]).nodeName == "LINK" ){
						if(jqueryHTML[i].rel && jqueryHTML[i].href){
							if(jqueryHTML[i].rel.indexOf("touch-icon") >= 0 ){
								console.log(jqueryHTML[i]);
								imageURL =  jqueryHTML[i].href
							}
							
						}
					}
					else if((jqueryHTML[i]).nodeName == "META" ){
						console.log("\n\n\nMETA\n\n\n")
						if(jqueryHTML[i].attributes["property"] && jqueryHTML[i].content){
							console.log("\n\n\nproperty: ");
							console.log(jqueryHTML[i].attributes["property"]);
							if(jqueryHTML[i].property.indexOf("og:image") >= 0 ){
								console.log(jqueryHTML[i]);
								imageURL =  jqueryHTML[i].content
							}
							
						}
					}
				}

				console.log("getBestImageURL: ");
				console.log(imageURL);

			});

		};

		Utils.tryImage = function(url, success, failure){
			$.ajax({
				type: "GET",
				url: url,
				success: success,
				error: failure
			});
		};

		Utils.getFaviconUrl = function (url){
			var faviconUrl;
			if(url.indexOf("/", 8) > 0 ){
				faviconUrl = url.slice( 0, url.indexOf("/", 8)) + "/favicon.ico";
			}
			else{
				faviconUrl = url + "favicon.ico";
			}

			return faviconUrl;
		};



		return Utils;

	});

function hasProperty(domElement){

}