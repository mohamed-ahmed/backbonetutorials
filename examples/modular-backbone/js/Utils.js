
/* Utility functions
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
 					//console.log("getting html for: " + url);
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
								//console.log("has touch icon")
								//console.log(jqueryHTML[i].attributes["href"].value);
								imageURL =  jqueryHTML[i].attributes["href"].value;
								imageURL = Utils.getFullImageURL(pageURL, imageURL);
								break;
							}

							else if(jqueryHTML[i].rel.indexOf("shortcut icon") >= 0 ){
								console.log("has shortcut icon")
								//console.log(jqueryHTML[i].attributes["href"].value);
								imageURL =  jqueryHTML[i].attributes["href"].value;
								imageURL = Utils.getFullImageURL(pageURL, imageURL);
							}
							
						}
					}
					else if((jqueryHTML[i]).nodeName == "META" ){
						//console.log("META")
						if(jqueryHTML[i].attributes["property"] && jqueryHTML[i].content){
							//console.log("property: ");
							//console.log(jqueryHTML[i].attributes["property"]);
							if(jqueryHTML[i].attributes["property"].value.indexOf("og:image") >= 0 ){
								//console.log("og:image found: ");
								//console.log(jqueryHTML[i].content);
								//console.log(jqueryHTML[i]);
								imageURL =  jqueryHTML[i].content;
								imageURL = Utils.getFullImageURL(pageURL, imageURL);
							}
							
						}
					}


					else if( !imageURL && (jqueryHTML[i]).nodeName == "DIV" ){
						imageURL = Utils.getFaviconUrl(pageURL);
						//console.log("reached a div")
						break;
					}
				}
				if(!imageURL){
					imageURL = Utils.getFaviconUrl(pageURL);
				}

				//console.log("getBestImageURL: ");
				//console.log(imageURL);
				Utils.tryImage(imageURL,
					function(){				//success
						//console.log("sucess");
						callback(imageURL);
					},
					function(){				//failure
						//console.log("failure");
						callback("imgs/browser-icon.png")
					}

				);

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
				faviconUrl = url + "/favicon.ico";
			}

			return faviconUrl;
		};

		Utils.getFullImageURL = function (siteUrl, imagePath){
			//console.log("getting full path for:" + siteUrl + ", " + imagePath);
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

			//console.log("full path is:  " + absUrl);

			return absUrl;
		}


		Utils.imgToDataURL = function(url, callback, outputFormat, quality) {
			var canvas = document.createElement('CANVAS'),
				ctx = canvas.getContext('2d'),
				img = new Image(100,100);
			img.crossOrigin = 'Anonymous';
			img.onload = function() {
				var dataURL;
				canvas.height = 100;//img.height;
				canvas.width = 100;//img.width;
				try {
					ctx.drawImage(img, 0, 0, width=100, height=100);
					dataURL = canvas.toDataURL(outputFormat, quality);
					callback(null, dataURL);
				} catch (e) {
					callback(e, null);
				}
				canvas = img = null;
			};
			img.onerror = function() {
				callback(new Error('Could not load image'), null);
			};
			img.src = url;
		}

		/*Utils.stripUrl = function(url){
			if(url.indexOf("//") >=0 ){
				return url.split("//")[1].split("/")[0].toLowerCase();
			}
			else return url.split("/")[0].toLowerCase();
		}*/

		Utils.saveLocal = function(key, value){
			var keyValueObj = {};
			keyValueObj[key] = value;
			chrome.storage.local.set( keyValueObj, function() {
				//console.log("saving: ");
				//console.log(keyValueObj);
				//console.log(keyValueObj[key]);
				//console.log(' saved');
			});
		}

		Utils.saveSync = function(key, value){
			var keyValueObj = {};
			keyValueObj[key] = value;
			chrome.storage.sync.set( keyValueObj, function() {
				//console.log("saving: ");
				//console.log(keyValueObj);
				//console.log(keyValueObj[key]);
				//console.log(' saved');
			});
		}

		Utils.addToLocalCollection = function(key, newValue){
			var collection;
			chrome.storage.local.get(key, function(value){
				collection = value[key];
				collection.push(newValue);
				Utils.saveLocal(key, collection, function(){
					console.log("collection saved");
				})
			});
		}

		Utils.addToSyncCollection = function(key, newValue){
			var collection;
			chrome.storage.local.get(key, function(value){
				collection = value[key];
				collection.push(newValue);
				Utils.saveSyncl(key, collection, function(){
					console.log("collection saved");
				})
			});
		}

		Utils.getUniquePage = function(url){
			var uniqueUrl = url;
			if(uniqueUrl.indexOf("https://") >=0 ){
				uniqueUrl = uniqueUrl.split("https://")[1];
			}
			if(uniqueUrl.indexOf("http://") == 0 ){
				uniqueUrl = uniqueUrl.split("http://")[1];
			}
			if(uniqueUrl.indexOf("www.") == 0 ){
				uniqueUrl = uniqueUrl.split("www.")[1];
			}

			if(uniqueUrl[uniqueUrl.length-1] == "/"){
				uniqueUrl = uniqueUrl.slice(0,uniqueUrl.length-1);
			}
			return uniqueUrl;

		}

		Utils.saveLocalSitestoServer = function(){

		}




		return Utils;

	});

