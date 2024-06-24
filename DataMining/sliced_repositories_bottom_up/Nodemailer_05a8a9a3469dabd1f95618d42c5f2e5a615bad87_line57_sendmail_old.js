function SendmailTransport(config){
}
SendmailTransport.prototype.sendMail = function sendMail(emailMessage, callback){
    var envelope = emailMessage.getEnvelope(),
        args = this.args || ["-f"].concat(envelope.from).concat(envelope.to),
        sendmail,
        cbCounter = 2,
        didCb,
        marker = "SendmailTransport.sendMail",
        transform;
};
