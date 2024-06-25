    mimelib = require("mimelib-noiconv"),
    util = require("util"),
    EventEmitter = require("events").EventEmitter
var X_MAILER_NAME = "Nodemailer",
    X_MAILER_VERSION = "0.1.18; +http://www.nodemailer.org";
var gencounter = 0,
    instancecounter = 0;
function EmailMessage(params){
    EventEmitter.call(this);
    params = params || {};
}
var utillib = require("util");
EmailMessage.prototype.prepareVariables = function(){
    if(this.html || this.attachments.length){
        this.content_multipart = true;
        this.content_boundary = "----NODEMAILER-?=_"+(++gencounter)+"-"+Date.now();
    }else{
}
EmailMessage.prototype.generateHeaders = function(){

    var headers = [];
    var keys = Object.keys(this.headers);
    for(var i=0, len=keys.length; i<len; i++){
    }
}
EmailMessage.prototype.generateBody = function(){

    if(!this.content_multipart){
        return this.body && mimelib.encodeQuotedPrintable(this.body) || "";
    }
    var body_boundary = this.content_mixed?
            "----NODEMAILER-?=_"+(++gencounter)+"-"+Date.now():
        rows = [];
    var current;
    for(var i=0; i<this.attachments.length; i++){
        current = {
            filename: hasUTFChars(this.attachments[i].filename)?
            mime_type: getMimeType(this.attachments[i].filename),
            contents: this.attachments[i].contents instanceof Buffer?
            disposition: "attachment",
            content_id: this.attachments[i].cid || ((++gencounter)+"."+Date.now()+"@"+this.SERVER.hostname)
        };
    }
}
