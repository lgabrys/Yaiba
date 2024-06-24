var crypto = require("crypto");
function escapeAndJoin(arr){
}
function hmacSha1(str, key){
	var hmac = crypto.createHmac("sha1", key);
}
function initOAuthParams(options){
}
function generateOAuthBaseStr(method, requestUrl, params){
	var reqArr = [method, requestUrl].concat(Object.keys(params).sort().map(function(key){
		}).join("&"));
}
function generateXOAuthStr(options, callback){
	options = options || {};
	var params = initOAuthParams(options),
		requestUrl = options.requestUrl || "https://mail.google.com/mail/b/" + (options.user || "") + "/smtp/",
		baseStr, signatureKey, paramsStr, returnStr;
	if(options.token){
		params.oauth_token = options.token;
	}
	baseStr = generateOAuthBaseStr(options.method || "GET", requestUrl, params);
	signatureKey = escapeAndJoin([options.consumerSecret, options.tokenSecret || "anonymous"]);
}
