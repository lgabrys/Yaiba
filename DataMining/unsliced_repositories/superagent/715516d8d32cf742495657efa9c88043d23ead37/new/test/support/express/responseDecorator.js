/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const path = require('path');
const { Buffer } = require('safe-buffer');
const contentDisposition = require('content-disposition');
const encodeUrl = require('encodeurl');
const escapeHtml = require('escape-html');
const onFinished = require('on-finished');
const pathIsAbsolute = require('path-is-absolute');
const statuses = require('statuses');
const merge = require('utils-merge');
const { sign } = require('cookie-signature');
const cookie = require('cookie');
const send = require('send');
const { normalizeType } = require('./utils');
const { normalizeTypes } = require('./utils');
const { setCharset } = require('./utils');

const { extname } = path;
const { mime } = send;
const { resolve } = path;
const vary = require('vary');
/**
 * Module exports.
 * @public
 */

module.exports = setMethods;

function setMethods(res) {
  /**
   * Module variables.
   * @private
   */

  const charsetRegExp = /;\s*charset\s*=/;

  /**
   * Set status `code`.
   *
   * @param {Number} code
   * @return {ServerResponse}
   * @public
   */

  res.status = function status(code) {
    this.statusCode = code;
    return this;
  };

  /**
   * Set Link header field with the given `links`.
   *
   * Examples:
   *
   *    res.links({
   *      next: 'http://api.example.com/users?page=2',
   *      last: 'http://api.example.com/users?page=5'
   *    });
   *
   * @param {Object} links
   * @return {ServerResponse}
   * @public
   */

  res.links = function (links) {
    let link = this.get('Link') || '';
    if (link) link += ', ';
    return this.set(
      'Link',
      link +
        Object.keys(links)
          .map((rel) => {
            return '<' + links[rel] + '>; rel="' + rel + '"';
          })
          .join(', ')
    );
  };

  /**
   * Send a response.
   *
   * Examples:
   *
   *     res.send(Buffer.from('wahoo'));
   *     res.send({ some: 'json' });
   *     res.send('<p>some html</p>');
   *
   * @param {string|number|boolean|object|Buffer} body
   * @public
   */

  res.send = function send(body) {
    let chunk = body;
    let encoding;
    const { req } = this;
    let type;

    // settings
    const { app } = this;

    switch (typeof chunk) {
      // string defaulting to html
      case 'string':
        if (!this.get('Content-Type')) {
          this.type('html');
        }

        break;
      case 'boolean':
      case 'number':
      case 'object':
        if (chunk === null) {
          chunk = '';
        } else if (Buffer.isBuffer(chunk)) {
          if (!this.get('Content-Type')) {
            this.type('bin');
          }
        } else {
          return this.json(chunk);
        }

        break;
    }

    // write strings in utf-8
    if (typeof chunk === 'string') {
      encoding = 'utf8';
      type = this.get('Content-Type');

      // reflect this in content-type
      if (typeof type === 'string') {
        this.set('Content-Type', setCharset(type, 'utf-8'));
      }
    }

    // determine if ETag should be generated
    const etagFn = app.get('etag fn');
    const generateETag = !this.get('ETag') && typeof etagFn === 'function';

    // populate Content-Length
    let length_;
    if (chunk !== undefined) {
      if (Buffer.isBuffer(chunk)) {
        // get length of Buffer
        length_ = chunk.length;
      } else if (!generateETag && chunk.length < 1000) {
        // just calculate length when no ETag + small chunk
        length_ = Buffer.byteLength(chunk, encoding);
      } else {
        // convert chunk to Buffer and calculate
        chunk = Buffer.from(chunk, encoding);
        encoding = undefined;
        length_ = chunk.length;
      }

      this.set('Content-Length', length_);
    }

    // populate ETag
    let etag;
    if (
      generateETag &&
      length_ !== undefined &&
      (etag = etagFn(chunk, encoding))
    ) {
      this.set('ETag', etag);
    }

    // freshness
    if (req.fresh) this.statusCode = 304;

    // strip irrelevant headers
    if (this.statusCode === 204 || this.statusCode === 304) {
      this.removeHeader('Content-Type');
      this.removeHeader('Content-Length');
      this.removeHeader('Transfer-Encoding');
      chunk = '';
    }

    if (req.method === 'HEAD') {
      // skip body for HEAD
      this.end();
    } else {
      // respond
      this.end(chunk, encoding);
    }

    return this;
  };

  /**
   * Send JSON response.
   *
   * Examples:
   *
   *     res.json(null);
   *     res.json({ user: 'tj' });
   *
   * @param {string|number|boolean|object} obj
   * @public
   */

  res.json = function json(object) {
    // settings
    const { app } = this;
    const escape = app.get('json escape');
    const replacer = app.get('json replacer');
    const spaces = app.get('json spaces');
    const body = stringify(object, replacer, spaces, escape);

    // content-type
    if (!this.get('Content-Type')) {
      this.set('Content-Type', 'application/json');
    }

    return this.send(body);
  };

  /**
   * Send JSON response with JSONP callback support.
   *
   * Examples:
   *
   *     res.jsonp(null);
   *     res.jsonp({ user: 'tj' });
   *
   * @param {string|number|boolean|object} obj
   * @public
   */

  res.jsonp = function jsonp(object) {
    // settings
    const { app } = this;
    const escape = app.get('json escape');
    const replacer = app.get('json replacer');
    const spaces = app.get('json spaces');
    let body = stringify(object, replacer, spaces, escape);
    let callback = this.req.query[app.get('jsonp callback name')];

    // content-type
    if (!this.get('Content-Type')) {
      this.set('X-Content-Type-Options', 'nosniff');
      this.set('Content-Type', 'application/json');
    }

    // fixup callback
    if (Array.isArray(callback)) {
      callback = callback[0];
    }

    // jsonp
    if (typeof callback === 'string' && callback.length > 0) {
      this.set('X-Content-Type-Options', 'nosniff');
      this.set('Content-Type', 'text/javascript');

      // restrict callback charset
      callback = callback.replace(/[^[\]\w$.]/g, '');

      // replace chars not allowed in JavaScript that are in JSON
      body = body.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

      // the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
      // the typeof check is just to reduce client error noise
      body =
        '/**/ typeof ' +
        callback +
        " === 'function' && " +
        callback +
        '(' +
        body +
        ');';
    }

    return this.send(body);
  };

  /**
   * Send given HTTP status code.
   *
   * Sets the response status to `statusCode` and the body of the
   * response to the standard description from node's http.STATUS_CODES
   * or the statusCode number if no description.
   *
   * Examples:
   *
   *     res.sendStatus(200);
   *
   * @param {number} statusCode
   * @public
   */

  res.sendStatus = function sendStatus(statusCode) {
    const body = statuses(statusCode) || String(statusCode);

    this.statusCode = statusCode;
    this.type('txt');

    return this.send(body);
  };

  /**
   * Transfer the file at the given `path`.
   *
   * Automatically sets the _Content-Type_ response header field.
   * The callback `callback(err)` is invoked when the transfer is complete
   * or when an error occurs. Be sure to check `res.sentHeader`
   * if you wish to attempt responding, as the header and some data
   * may have already been transferred.
   *
   * Options:
   *
   *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
   *   - `root`     root directory for relative filenames
   *   - `headers`  object of headers to serve with file
   *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
   *
   * Other options are passed along to `send`.
   *
   * Examples:
   *
   *  The following example illustrates how `res.sendFile()` may
   *  be used as an alternative for the `static()` middleware for
   *  dynamic situations. The code backing `res.sendFile()` is actually
   *  the same code, so HTTP cache support etc is identical.
   *
   *     app.get('/user/:uid/photos/:file', function(req, res){
   *       var uid = req.params.uid
   *         , file = req.params.file;
   *
   *       req.user.mayViewFilesFrom(uid, function(yes){
   *         if (yes) {
   *           res.sendFile('/uploads/' + uid + '/' + file);
   *         } else {
   *           res.send(403, 'Sorry! you cant see that.');
   *         }
   *       });
   *     });
   *
   * @public
   */

  res.sendFile = function sendFile(path, options, callback) {
    let done = callback;
    const { req } = this;
    const res = this;
    const { next } = req;
    let options_ = options || {};

    if (!path) {
      throw new TypeError('path argument is required to res.sendFile');
    }

    // support function as second arg
    if (typeof options === 'function') {
      done = options;
      options_ = {};
    }

    if (!options_.root && !pathIsAbsolute(path)) {
      throw new TypeError(
        'path must be absolute or specify root to res.sendFile'
      );
    }

    // create file stream
    const pathname = encodeURI(path);
    const file = send(req, pathname, options_);

    // transfer
    sendfile(res, file, options_, (error) => {
      if (done) return done(error);
      if (error && error.code === 'EISDIR') return next();

      // next() all but write errors
      if (error && error.code !== 'ECONNABORTED' && error.syscall !== 'write') {
        next(error);
      }
    });
  };

  /**
   * Transfer the file at the given `path` as an attachment.
   *
   * Optionally providing an alternate attachment `filename`,
   * and optional callback `callback(err)`. The callback is invoked
   * when the data transfer is complete, or when an error has
   * ocurred. Be sure to check `res.headersSent` if you plan to respond.
   *
   * Optionally providing an `options` object to use with `res.sendFile()`.
   * This function will set the `Content-Disposition` header, overriding
   * any `Content-Disposition` header passed as header options in order
   * to set the attachment and filename.
   *
   * This method uses `res.sendFile()`.
   *
   * @public
   */

  res.download = function download(path, filename, options, callback) {
    let done = callback;
    let name = filename;
    let options_ = options || null;

    // support function as second or third arg
    if (typeof filename === 'function') {
      done = filename;
      name = null;
      options_ = null;
    } else if (typeof options === 'function') {
      done = options;
      options_ = null;
    }

    // set Content-Disposition when file is sent
    const headers = {
      'Content-Disposition': contentDisposition(name || path)
    };

    // merge user-provided headers
    if (options_ && options_.headers) {
      const keys = Object.keys(options_.headers);
      for (const key of keys) {
        if (key.toLowerCase() !== 'content-disposition') {
          headers[key] = options_.headers[key];
        }
      }
    }

    // merge user-provided options
    options_ = Object.create(options_);
    options_.headers = headers;

    // Resolve the full path for sendFile
    const fullPath = resolve(path);

    // send file
    return this.sendFile(fullPath, options_, done);
  };

  /**
   * Set _Content-Type_ response header with `type` through `mime.lookup()`
   * when it does not contain "/", or set the Content-Type to `type` otherwise.
   *
   * Examples:
   *
   *     res.type('.html');
   *     res.type('html');
   *     res.type('json');
   *     res.type('application/json');
   *     res.type('png');
   *
   * @param {String} type
   * @return {ServerResponse} for chaining
   * @public
   */

  res.contentType = res.type = function contentType(type) {
    const ct = !type.includes('/') ? mime.lookup(type) : type;

    return this.set('Content-Type', ct);
  };

  /**
   * Respond to the Acceptable formats using an `obj`
   * of mime-type callbacks.
   *
   * This method uses `req.accepted`, an array of
   * acceptable types ordered by their quality values.
   * When "Accept" is not present the _first_ callback
   * is invoked, otherwise the first match is used. When
   * no match is performed the server responds with
   * 406 "Not Acceptable".
   *
   * Content-Type is set for you, however if you choose
   * you may alter this within the callback using `res.type()`
   * or `res.set('Content-Type', ...)`.
   *
   *    res.format({
   *      'text/plain': function(){
   *        res.send('hey');
   *      },
   *
   *      'text/html': function(){
   *        res.send('<p>hey</p>');
   *      },
   *
   *      'appliation/json': function(){
   *        res.send({ message: 'hey' });
   *      }
   *    });
   *
   * In addition to canonicalized MIME types you may
   * also use extnames mapped to these types:
   *
   *    res.format({
   *      text: function(){
   *        res.send('hey');
   *      },
   *
   *      html: function(){
   *        res.send('<p>hey</p>');
   *      },
   *
   *      json: function(){
   *        res.send({ message: 'hey' });
   *      }
   *    });
   *
   * By default Express passes an `Error`
   * with a `.status` of 406 to `next(err)`
   * if a match is not made. If you provide
   * a `.default` callback it will be invoked
   * instead.
   *
   * @param {Object} obj
   * @return {ServerResponse} for chaining
   * @public
   */

  res.format = function (object) {
    const { req } = this;
    const { next } = req;

    const fn = object.default;
    if (fn) delete object.default;
    const keys = Object.keys(object);

    const key = keys.length > 0 ? req.accepts(keys) : false;

    this.vary('Accept');

    if (key) {
      this.set('Content-Type', normalizeType(key).value);
      object[key](req, this, next);
    } else if (fn) {
      fn();
    } else {
      const error = new Error('Not Acceptable');
      error.status = error.statusCode = 406;
      error.types = normalizeTypes(keys).map((o) => {
        return o.value;
      });
      next(error);
    }

    return this;
  };

  /**
   * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
   *
   * @param {String} filename
   * @return {ServerResponse}
   * @public
   */

  res.attachment = function attachment(filename) {
    if (filename) {
      this.type(extname(filename));
    }

    this.set('Content-Disposition', contentDisposition(filename));

    return this;
  };

  /**
   * Append additional header `field` with value `val`.
   *
   * Example:
   *
   *    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
   *    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
   *    res.append('Warning', '199 Miscellaneous warning');
   *
   * @param {String} field
   * @param {String|Array} val
   * @return {ServerResponse} for chaining
   * @public
   */

  res.append = function append(field, value_) {
    const previous = this.get(field);
    let value = value_;

    if (previous) {
      // concat the new and prev vals
      value = Array.isArray(previous)
        ? previous.concat(value_)
        : Array.isArray(value_)
        ? [previous].concat(value_)
        : [previous, value_];
    }

    return this.set(field, value);
  };

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
   *
   * Examples:
   *
   *    res.set('Foo', ['bar', 'baz']);
   *    res.set('Accept', 'application/json');
   *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
   *
   * Aliased as `res.header()`.
   *
   * @param {String|Object} field
   * @param {String|Array} val
   * @return {ServerResponse} for chaining
   * @public
   */

  res.set = res.header = function header(field, value_) {
    if (arguments.length === 2) {
      let value = Array.isArray(value_) ? value_.map(String) : String(value_);

      // add charset to content-type
      if (field.toLowerCase() === 'content-type') {
        if (Array.isArray(value)) {
          throw new TypeError('Content-Type cannot be set to an Array');
        }

        if (!charsetRegExp.test(value)) {
          const charset = mime.charsets.lookup(value.split(';')[0]);
          if (charset) value += '; charset=' + charset.toLowerCase();
        }
      }

      this.setHeader(field, value);
    } else {
      for (const key in field) {
        this.set(key, field[key]);
      }
    }

    return this;
  };

  /**
   * Get value for header `field`.
   *
   * @param {String} field
   * @return {String}
   * @public
   */

  res.get = function (field) {
    return this.getHeader(field);
  };

  /**
   * Clear cookie `name`.
   *
   * @param {String} name
   * @param {Object} [options]
   * @return {ServerResponse} for chaining
   * @public
   */

  res.clearCookie = function clearCookie(name, options) {
    const options_ = merge({ expires: new Date(1), path: '/' }, options);

    return this.cookie(name, '', options_);
  };

  /**
   * Set cookie `name` to `value`, with the given `options`.
   *
   * Options:
   *
   *    - `maxAge`   max-age in milliseconds, converted to `expires`
   *    - `signed`   sign the cookie
   *    - `path`     defaults to "/"
   *
   * Examples:
   *
   *    // "Remember Me" for 15 minutes
   *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
   *
   *    // save as above
   *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
   *
   * @param {String} name
   * @param {String|Object} value
   * @param {Object} [options]
   * @return {ServerResponse} for chaining
   * @public
   */

  res.cookie = function (name, value, options) {
    const options_ = merge({}, options);
    const { secret } = this.req;
    const { signed } = options_;

    if (signed && !secret) {
      throw new Error('cookieParser("secret") required for signed cookies');
    }

    let value_ =
      typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

    if (signed) {
      value_ = 's:' + sign(value_, secret);
    }

    if ('maxAge' in options_) {
      options_.expires = new Date(Date.now() + options_.maxAge);
      options_.maxAge /= 1000;
    }

    if (options_.path == null) {
      options_.path = '/';
    }

    this.append('Set-Cookie', cookie.serialize(name, String(value_), options_));

    return this;
  };

  /**
   * Set the location header to `url`.
   *
   * The given `url` can also be "back", which redirects
   * to the _Referrer_ or _Referer_ headers or "/".
   *
   * Examples:
   *
   *    res.location('/foo/bar').;
   *    res.location('http://example.com');
   *    res.location('../login');
   *
   * @param {String} url
   * @return {ServerResponse} for chaining
   * @public
   */

  res.location = function location(url) {
    let loc = url;

    // "back" is an alias for the referrer
    if (url === 'back') {
      loc = this.req.get('Referrer') || '/';
    }

    // set location
    return this.set('Location', encodeUrl(loc));
  };

  /**
   * Redirect to the given `url` with optional response `status`
   * defaulting to 302.
   *
   * The resulting `url` is determined by `res.location()`, so
   * it will play nicely with mounted apps, relative paths,
   * `"back"` etc.
   *
   * Examples:
   *
   *    res.redirect('/foo/bar');
   *    res.redirect('http://example.com');
   *    res.redirect(301, 'http://example.com');
   *    res.redirect('../login'); // /blog/post/1 -> /blog/login
   *
   * @public
   */

  res.redirect = function redirect(url) {
    let address = url;
    let body;
    let status = 302;

    // allow status / url
    if (arguments.length === 2) {
      status = arguments[0];
      address = arguments[1];
    }

    // Set location header
    address = this.location(address).get('Location');

    // Support text/{plain,html} by default
    this.format({
      text() {
        body = statuses(status) + '. Redirecting to ' + address;
      },

      html() {
        const u = escapeHtml(address);
        body =
          '<p>' +
          statuses(status) +
          '. Redirecting to <a href="' +
          u +
          '">' +
          u +
          '</a></p>';
      },

      default() {
        body = '';
      }
    });

    // Respond
    this.statusCode = status;
    this.set('Content-Length', Buffer.byteLength(body));

    if (this.req.method === 'HEAD') {
      this.end();
    } else {
      this.end(body);
    }
  };

  /**
   * Add `field` to Vary. If already present in the Vary set, then
   * this call is simply ignored.
   *
   * @param {Array|String} field
   * @return {ServerResponse} for chaining
   * @public
   */

  res.vary = function (field) {
    vary(this, field);

    return this;
  };

  /**
   * Render `view` with the given `options` and optional callback `fn`.
   * When a callback function is given a response will _not_ be made
   * automatically, otherwise a response of _200_ and _text/html_ is given.
   *
   * Options:
   *
   *  - `cache`     boolean hinting to the engine it should cache
   *  - `filename`  filename of the view being rendered
   *
   * @public
   */

  res.render = function render(view, options, callback) {
    const { app } = this.req;
    let done = callback;
    let options_ = options || {};
    const { req } = this;
    const self = this;

    // support callback function as second arg
    if (typeof options === 'function') {
      done = options;
      options_ = {};
    }

    // merge res.locals
    options_._locals = self.locals;

    // default callback to respond
    done =
      done ||
      function (error, string_) {
        if (error) return req.next(error);
        self.send(string_);
      };

    // render
    app.render(view, options_, done);
  };

  // pipe the send file stream
  function sendfile(res, file, options, callback) {
    let done = false;
    let streaming;

    // request aborted
    function onaborted() {
      if (done) return;
      done = true;

      const error = new Error('Request aborted');
      error.code = 'ECONNABORTED';
      callback(error);
    }

    // directory
    function ondirectory() {
      if (done) return;
      done = true;

      const error = new Error('EISDIR, read');
      error.code = 'EISDIR';
      callback(error);
    }

    // errors
    function onerror(error) {
      if (done) return;
      done = true;
      callback(error);
    }

    // ended
    function onend() {
      if (done) return;
      done = true;
      callback();
    }

    // file
    function onfile() {
      streaming = false;
    }

    // finished
    function onfinish(error) {
      if (error && error.code === 'ECONNRESET') return onaborted();
      if (error) return onerror(error);
      if (done) return;

      setImmediate(() => {
        if (streaming !== false && !done) {
          onaborted();
          return;
        }

        if (done) return;
        done = true;
        callback();
      });
    }

    // streaming
    function onstream() {
      streaming = true;
    }

    file.on('directory', ondirectory);
    file.on('end', onend);
    file.on('error', onerror);
    file.on('file', onfile);
    file.on('stream', onstream);

    if (options.headers) {
      // set headers on successful transfer
      file.on('headers', function headers(res) {
        const object = options.headers;
        const keys = Object.keys(object);

        for (const k of keys) {
          res.setHeader(k, object[k]);
        }
      });
    }

    // pipe
    file.pipe(res);

    onFinished(res, onfinish);
  }

  return res;
}

/**
 * Stringify JSON, like JSON.stringify, but v8 optimized, with the
 * ability to escape characters that can trigger HTML sniffing.
 *
 * @param {*} value
 * @param {function} replaces
 * @param {number} spaces
 * @param {boolean} escape
 * @returns {string}
 * @private
 */

function stringify(value, replacer, spaces, escape) {
  // v8 checks arguments.length for optimizing simple call
  // https://bugs.chromium.org/p/v8/issues/detail?id=4730
  let json =
    replacer || spaces
      ? JSON.stringify(value, replacer, spaces)
      : JSON.stringify(value);

  if (escape) {
    json = json.replace(/[<>&]/g, (c) => {
      switch (c.charCodeAt(0)) {
        case 0x3c:
          return '\\u003c';
        case 0x3e:
          return '\\u003e';
        case 0x26:
          return '\\u0026';
        default:
          return c;
      }
    });
  }

  return json;
}
