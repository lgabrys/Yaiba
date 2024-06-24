/*!
 * superagent
 * Copyright (c) 2012 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */


;(function(){
  var Emitter = 'undefined' == typeof exports
  function getXHR() {
    if (window.XMLHttpRequest
      && ('file:' != window.location.protocol || !window.ActiveXObject)) {
    } else {
  }


  function isFunction(obj) {
  }
  /**
   * Serialize the given `obj`.
   *
   * @param {Object} obj
   * @return {String}
   * @api private
   */
  function serialize(obj) {
  }
  /**
   * Expose serialization method.
   */
   request.serializeObject = serialize;
  function parseString(str) {
  }
  request.parseString = parseString;
  request.types = {
  };
   request.serialize = {
   };
  request.parse = {
  };
  function Response(xhr, options) {
    options = options || {};
  }
  Response.prototype.setHeaderProperties = function(header){
  };
  Response.prototype.parseBody = function(str){
  };
  Response.prototype.setStatusProperties = function(status){
  };
  request.Response = Response;
  function Request(method, url) {
  }
  Request.prototype = new Emitter;
  Request.prototype.constructor = Request;
  Request.prototype.abort = function(){
  };
  Request.prototype.set = function(field, val){
  };
  Request.prototype.type = function(type){
  };
  Request.prototype.query = function(obj){
  };
  Request.prototype.send = function(data){
  };
  Request.prototype.end = function(fn){
  };
  request.Request = Request;
  function request(method, url) {
  }
  request.get = function(url, data, fn){
    var req = request('GET', url);
    if (isFunction(data)) fn = data, data = null;
    if (data) req.send(data);
  };
})();
