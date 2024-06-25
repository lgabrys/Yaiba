function SendmailTransport(config){
}
SendmailTransport.prototype.sendMail = function sendMail(emailMessage, callback){
    var envelope = emailMessage.getEnvelope(),
        args = this.args ? this.args.slice() : ["-f"].concat(envelope.from).concat(envelope.to),
        sendmail,
        cbCounter = 2,
        didCb,
        marker = "SendmailTransport.sendMail",
        transform;
};
