
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

		Utils.getBestImageURL = function(pageURL, callback){

			this.getHTML(pageURL, function(jqueryHTML){

				var imageURL;
				for(var i = 0; i < jqueryHTML.length; i++){
					if((jqueryHTML[i]).nodeName == "LINK" ){
						if(jqueryHTML[i].rel && jqueryHTML[i].href){
							if(jqueryHTML[i].rel.indexOf("touch-icon") >= 0 ){
								console.log("has touch icon")
								console.log(jqueryHTML[i].attributes["href"].value);
								imageURL =  jqueryHTML[i].attributes["href"].value;
								imageURL = Utils.getFullImageURL(pageURL, imageURL);
								break;
							}
							
						}
					}
					else if((jqueryHTML[i]).nodeName == "META" ){
						console.log("\n\n\nMETA\n\n\n")
						if(jqueryHTML[i].attributes["property"] && jqueryHTML[i].content){
							console.log("\n\n\nproperty: ");
							console.log(jqueryHTML[i].attributes["property"]);
							if(jqueryHTML[i].attributes["property"].value.indexOf("og:image") >= 0 ){
								console.log(jqueryHTML[i]);
								imageURL =  jqueryHTML[i].content;
								imageURL = Utils.getFullImageURL(pageURL, imageURL);
							}
							
						}
					}
					else if((jqueryHTML[i]).nodeName == "DIV" ){
						imageURL = Utils.getFaviconUrl(pageURL);
						console.log("reached a div")
						break;
					}
				}
				if(!imageURL){
					imageURL = Utils.getFaviconUrl(pageURL);
				}

				console.log("getBestImageURL: ");
				console.log(imageURL);
				callback(imageURL);

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

		Utils.getFaviconUrl = function(url){
			var faviconUrl;
			if(url.indexOf("/", 8) > 0 ){
				faviconUrl = url.slice( 0, url.indexOf("/", 8)) + "/favicon.ico";
			}
			else{
				faviconUrl = url + "favicon.ico";
			}

			return faviconUrl;
		};

		Utils.getFullImageURL = function (siteUrl, imagePath){
			var absUrl;

			if(imagePath.indexOf("//") == 0){
				absUrl = "http:" + imagePath;
			}

			else if(imagePath.indexOf("http") >= 0){
				absUrl = imagePath;
			}
			else if(imagePath.indexOf("/") == 0){
				var thirdOccurenceOfSlash = siteUrl.indexOf("/",8);
				absUrl = siteUrl.slice(0, thirdOccurenceOfSlash) + imagePath;
			}
			else if( siteUrl.indexOf("/",8) >=0 ){
				var thirdOccurenceOfSlash = siteUrl.indexOf("/",7);
				absUrl = siteUrl.slice(0, thirdOccurenceOfSlash + 1) + imagePath;
			}
			else{
				absUrl = siteUrl + imagePath;
			}
			return absUrl;
		}

		return Utils;

	});

function hasProperty(domElement){

}