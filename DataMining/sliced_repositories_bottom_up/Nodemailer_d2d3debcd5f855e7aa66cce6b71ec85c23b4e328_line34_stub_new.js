function StubTransport(){}
StubTransport.prototype.sendMail = function(emailMessage, callback) {
    var output = "";
    emailMessage.options.keepBcc = true;
    emailMessage.on("data", function(data){
        output += (data || "").toString("utf-8");
    });
    emailMessage.on("end", function(){
        callback(null, {message: output, envelope: emailMessage.getEnvelope()});
    });
};
