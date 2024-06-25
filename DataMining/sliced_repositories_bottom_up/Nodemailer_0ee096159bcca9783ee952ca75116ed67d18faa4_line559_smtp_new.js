function SMTPClient(host, port, options){
}
SMTPClient.prototype._flushMessages = function() {
}
SMTPClient.prototype.sendMail = function sendMail(message, callback) {
}
SMTPClient.prototype.send = function(data, callback){
}
SMTPClient.prototype.close = function(){
};
SMTPClient.prototype._sendCommand = function(data, callback){
}
SMTPClient.prototype._sendData = function(data){
}
SMTPClient.prototype._loginHandler = function(callback){
}
SMTPClient.prototype._authPlain = function(callback){
}
SMTPClient.prototype._authLogin = function(callback){
}
SMTPClient.prototype._dataListener = function(data){
}
SMTPClient.prototype._handshakeListener = function(data, callback){
}
SMTPClient.prototype._starttlsHandler = function(callback){
}
SMTPClient.prototype._handshake = function(callback){
    this._sendCommand("EHLO "+this.hostname, (function(error, data){
        if(error){
            return this._sendCommand("HELO "+this.hostname, (function(error, data){
            }).bind(this));
        }
    }).bind(this));
}
