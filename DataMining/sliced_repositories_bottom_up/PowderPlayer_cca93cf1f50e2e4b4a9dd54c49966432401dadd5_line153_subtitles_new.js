var opensubtitles = require('opensubtitles-client');
var OS = require("opensubtitles-api");
var os = new OS();

function readData(xhr) {
	if (IsJsonString(xhr)) {
		jsonRes = JSON.parse(xhr);
		if (typeof jsonRes.filehash !== 'undefined') {
			powGlobals.fileHash = jsonRes.filehash;
		} else {
			findHash();
		}
	} else {
		clearTimeout(findHashTime);
	}
}
function subtitlesByExactHash(hash,fileSize,tag) {
	if (wjs().itemCount() > 0) {
		opensubtitles.api.login().done(function(token){
			powGlobals.osToken = token;
			utils = require('./node_modules/opensubtitles-client/lib/Utils.js')
			utils._getAllPostData(powGlobals.osToken, "all", hash, fileSize, tag).done(function(postData){
				utils.request("http://api.opensubtitles.org/xml-rpc", postData).done(function(response){
					try{
						results = utils.parseXmlSearchResult(response);
					}catch(e){
						results = [];
					}
					if (results.length > 0) {
						if (powGlobals.engine) checkInternet(function(isConnected) {
							if (isConnected) {
								if (powGlobals.byteLength) $.ajax({ type: 'GET', url: window.atob("aHR0cDovL3Bvd2Rlci5tZWRpYS9tZXRhRGF0YS9zZW5kLnBocD9mPQ==")+encodeURIComponent(powGlobals.filename)+window.atob("Jmg9")+encodeURIComponent(powGlobals.engine.infoHash)+window.atob("JnM9")+encodeURIComponent(powGlobals.byteLength)+window.atob("JmloPQ==")+encodeURIComponent(powGlobals.fileHash), global: false, cache: false });
							}
							checkSubData(isConnected,results);
						});
						else checkInternet(function(isConnected) { checkSubData(isConnected,results); });
					} else {
						delete powGlobals.fileHash;
						clearTimeout(findHashTime);
					}

					opensubtitles.api.logout(powGlobals.osToken);
				});
			});
		});
	}
}

function checkSubData(isConnected,results) {
	if (isConnected) {
		var subjectUrl = window.atob("aHR0cDovL3Bvd2Rlci5tZWRpYS9tZXRhRGF0YS9nZXRvcmRlci5waHA/Zj0=")+encodeURIComponent(powGlobals.filename)+window.atob("JmloPQ==")+encodeURIComponent(powGlobals.fileHash);
		if (powGlobals.engine) subjectUrl += window.atob("Jmg9")+encodeURIComponent(powGlobals.engine.infoHash);
		$.ajax({ type: 'GET', url: subjectUrl, dataType: 'json', global: false, cache: false, success: function(xhr) {
			if (xhr.constructor === {}.constructor) loadPlayerSubs(results,xhr);
			else loadPlayerSubs(results);
		}, error: function() { loadPlayerSubs(results); }
	} else loadPlayerSubs(results);
}

function loadPlayerSubs(results,reorder) {
	var howMany = [];
	var theSubs = [];
	var needsReorder = [];

	results.forEach(function(el,ij) {
		if (el.SubFormat.toLowerCase() == "srt" || el.SubFormat.toLowerCase() == "sub") {
			subLang = el.LanguageName;
			if (howMany[subLang]) {
				howMany[subLang]++;
				theSubs.some(function(aSub,sij) {
					if (aSub.lang == subLang) {
						tempStr = aSub.string;
						if (el.SubEncoding) {
							tempStr += '"'+subLang+' '+howMany[subLang]+'": "http://dl.opensubtitles.org/en/download/subencoding-utf8/file/'+el.IDSubtitleFile+'.'+el.SubFormat+'[-alt-]'+el.SubEncoding.replace("-","").toLowerCase()+'", ';
						} else {
							tempStr += '"'+subLang+' '+howMany[subLang]+'": "http://dl.opensubtitles.org/en/download/subencoding-utf8/file/'+el.IDSubtitleFile+'.'+el.SubFormat+'", ';
						}
						theSubs[sij].string = tempStr;
						return true;
					}
				});
			} else {
				howMany[subLang] = 1;
				if (el.SubEncoding) {
					var tempStr = '"'+subLang+'": "http://dl.opensubtitles.org/en/download/subencoding-utf8/file/'+el.IDSubtitleFile+'.'+el.SubFormat+'[-alt-]'+el.SubEncoding.replace("-","").toLowerCase()+'", ';
				} else {
					var tempStr = '"'+subLang+'": "http://dl.opensubtitles.org/en/download/subencoding-utf8/file/'+el.IDSubtitleFile+'.'+el.SubFormat+'", ';
				}
				theSubs.push({"lang": subLang, "string": tempStr});
			}
		}
	});
	var newString = "{ ";
	theSubs.forEach(function(el) {
		if (needsReorder.indexOf(el.lang) > -1) {
			var perfect = false;
			var tempString = el.string;
			tempString = tempString.substr(0,tempString.length -2);
			var tempArr = tempString.split(", ");
			while (!perfect) {
				perfect = true;
				tempArr.forEach(function(ml,ij) {
					if (ij > 0) {
						if (reorder[parseSubId(ml)]) var curVote = reorder[parseSubId(ml)];
						else var curVote = 0;
						if (reorder[parseSubId(tempArr[ij-1])]) var prevVote = reorder[parseSubId(tempArr[ij-1])];
						else var prevVote = 0;
						if (curVote > prevVote) {
							tempArr[ij] = tempArr[ij].split(": ")[0]+": "+tempArr[ij-1].split(": ")[1];
							tempArr[ij-1] = tempArr[ij-1].split(": ")[0]+": "+ml.split(": ")[1];
							perfect = false;
						}
					}
				});
			}
			el.string = tempArr.join(", ")+", ";
		}
		newString += el.string;
	});
	newString = newString.substr(0,newString.length -2)+" }";
	if (wjs().itemCount() > 0) { // check if playlist has any items again, otherwise js might error out
	}
}
function parseSubId(subRevert) {
	subRevert = subRevert.split(": ")[1].replace('"','').replace("http://dl.opensubtitles.org/en/download/subencoding-utf8/file/","");
}

function findHash() {
	if (keepState == "playing" || keepState == "paused") {
		if (!powGlobals.fileHash) {
			if (powGlobals.engine) {
				os.computeHash(powGlobals.path, function(err, hash){
					powGlobals.files.some(function(el,ij) {
						if (ij == powGlobals.videos[keepCurrent].index) {
						}
					});
				});
			} else {
		}
	} else {
}
