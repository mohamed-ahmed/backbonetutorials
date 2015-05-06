/*
 Testing Application
 */

 /*Test adding a site*/
 function testAddSavedSite(url){

 	var test;

 	var obj = {
 		x:1,
 		y:2
 	};

 	chrome.saveLocal(url, obj, testSavedSites);

	//test if url has been added to saved sites
	
	function testSavedSites(){

		
		chrome.storage.local.get("savedSites", function (value){
			if(values.savedSites.indexof(obj) >= 0){

			}
			else{
				return false;
			}
		});
	}

	//check if website is a key in chrome database
	function 
}