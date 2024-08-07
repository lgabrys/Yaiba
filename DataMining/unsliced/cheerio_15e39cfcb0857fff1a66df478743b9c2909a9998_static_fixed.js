/**
 * @module cheerio/static
 * @ignore
 */
var defaultOptions = require('./options').default;
var flattenOptions = require('./options').flatten;
var select = require('cheerio-select').select;
var renderWithParse5 = require('./parsers/parse5').render;
var renderWithHtmlparser2 = require('./parsers/htmlparser2').render;
var parse = require('./parse');

/**
 * Create a querying function, bound to a document created from the provided
 * markup. Note that similar to web browser contexts, this operation may
 * introduce `<html>`, `<head>`, and `<body>` elements; set `isDocument` to
 * `false` to switch to fragment mode and disable this.
 *
 * See the README section titled "Loading" for additional usage information.
 *
 * @param {string} content - Markup to be loaded.
 * @param {object} [options] - Options for the created instance.
 * @param {boolean} [isDocument] - Allows parser to be switched to fragment mode.
 * @returns {Cheerio} - The loaded document.
 */
exports.load = function (content, options, isDocument) {
  if (content === null || content === undefined) {
    throw new Error('cheerio.load() expects a string');
  }

  var Cheerio = require('./cheerio');

  options = Object.assign({}, defaultOptions, flattenOptions(options));

  if (isDocument === void 0) isDocument = true;

  var root = parse(content, options, isDocument);

  function initialize(selector, context, r, opts) {
    if (!(this instanceof initialize)) {
      return new initialize(selector, context, r, opts);
    }
    opts = Object.assign({}, options, opts);
    return Cheerio.call(this, selector, context, r || root, opts);
  }

  // Ensure that selections created by the "loaded" `initialize` function are
  // true Cheerio instances.
  initialize.prototype = Object.create(Cheerio.prototype);
  initialize.prototype.constructor = initialize;

  // Mimic jQuery's prototype alias for plugin authors.
  initialize.fn = initialize.prototype;

  // Keep a reference to the top-level scope so we can chain methods that implicitly
  // resolve selectors; e.g. $("<span>").(".bar"), which otherwise loses ._root
  initialize.prototype._originalRoot = root;

  // Add in the static methods
  Object.assign(initialize, exports);

  // Add in the root
  initialize._root = root;
  // store options
  initialize._options = options;

  return initialize;
};

/**
 * Helper function to render a DOM.
 *
 * @param {Cheerio} that - Cheerio instance to render.
 * @param {Node[] | undefined} dom - The DOM to render. Defaults to `that`'s root.
 * @param {object} options - Options for rendering.
 * @returns {string} The rendered document.
 */
function render(that, dom, options) {
  if (!dom) {
    if (that._root && that._root.children) {
      dom = that._root.children;
    } else {
      return '';
    }
  } else if (typeof dom === 'string') {
    dom = select(dom, that._root, options);
  }

  return options.xmlMode || options._useHtmlParser2
    ? renderWithHtmlparser2(dom, options)
    : renderWithParse5(dom);
}

/**
 * Renders the document.
 *
 * @param {string | Cheerio | Node | object} [dom] - Element to render.
 * @param {object} [options] - Options for the renderer.
 * @returns {string} The rendered document.
 */
exports.html = function (dom, options) {
  // be flexible about parameters, sometimes we call html(),
  // with options as only parameter
  // check dom argument for dom element specific properties
  // assume there is no 'length' or 'type' properties in the options object
  if (
    Object.prototype.toString.call(dom) === '[object Object]' &&
    !options &&
    !('length' in dom) &&
    !('type' in dom)
  ) {
    options = dom;
    dom = undefined;
  }

  // Sometimes `$.html()` is used without preloading html,
  // so fallback non-existing options to the default ones.
  options = Object.assign(
    {},
    defaultOptions,
    this._options,
    flattenOptions(options || {})
  );

  return render(this, dom, options);
};

/**
 * Render the document as XML.
 *
 * @param {string | Cheerio | Node} [dom] - Element to render.
 * @returns {string} THe rendered document.
 */
exports.xml = function (dom) {
  var options = Object.assign({}, this._options, { xmlMode: true });

  return render(this, dom, options);
};

/**
 * Render the document as text.
 *
 * @param {Cheerio | Node[]} [elems] - Elements to render.
 * @returns {string} The rendered document.
 */
exports.text = function (elems) {
  if (!elems) {
    elems = this.root();
  }

  var ret = '';
  var len = elems.length;

  for (var i = 0; i < len; i++) {
    var elem = elems[i];
    if (elem.type === 'text') ret += elem.data;
    else if (
      elem.children &&
      elem.type !== 'comment' &&
      elem.tagName !== 'script' &&
      elem.tagName !== 'style'
    ) {
      ret += exports.text(elem.children);
    }
  }

  return ret;
};

/**
 * Parses a string into an array of DOM nodes. The `context` argument has no
 * meaning for Cheerio, but it is maintained for API compatibility with jQuery.
 *
 * @param {string} data - Markup that will be parsed.
 * @param {any | boolean} [context] - Will be ignored. If it is a boolean it
 *     will be used as the value of `keepScripts`.
 * @param {boolean} [keepScripts] - If false all scripts will be removed.
 * @see {@link https://api.jquery.com/jQuery.parseHTML/}
 *
 * @alias Cheerio.parseHTML
 * @returns {Node[]} The parsed DOM.
 */
exports.parseHTML = function (data, context, keepScripts) {
  if (!data || typeof data !== 'string') {
    return null;
  }

  if (typeof context === 'boolean') {
    keepScripts = context;
  }

  var parsed = this.load(data, defaultOptions, false);
  if (!keepScripts) {
    parsed('script').remove();
  }

  // The `children` array is used by Cheerio internally to group elements that
  // share the same parents. When nodes created through `parseHTML` are
  // inserted into previously-existing DOM structures, they will be removed
  // from the `children` array. The results of `parseHTML` should remain
  // constant across these operations, so a shallow copy should be returned.
  return parsed.root()[0].children.slice();
};

/**
 * Sometimes you need to work with the top-level root element. To query it, you
 * can use `$.root()`.
 *
 * @example
 *   $.root().append('<ul id="vegetables"></ul>').html();
 *   //=> <ul id="fruits">...</ul><ul id="vegetables"></ul>
 *
 * @alias Cheerio.root
 * @returns {Cheerio} Cheerio instance wrapping the root node.
 */
exports.root = function () {
  return this(this._root);
};

/**
 * Checks to see if the `contained` DOM element is a descendant of the
 * `container` DOM element.
 *
 * @param {Node} container - Potential parent node.
 * @param {Node} contained - Potential child node.
 * @see {@link https://api.jquery.com/jQuery.contains/}
 *
 * @alias Cheerio.contains
 * @returns {boolean} Indicates if the nodes contain one another.
 */
exports.contains = function (container, contained) {
  // According to the jQuery API, an element does not "contain" itself
  if (contained === container) {
    return false;
  }

  // Step up the descendants, stopping when the root element is reached
  // (signaled by `.parent` returning a reference to the same object)
  while (contained && contained !== contained.parent) {
    contained = contained.parent;
    if (contained === container) {
      return true;
    }
  }

  return false;
};

/**
 * $.merge().
 *
 * @param {Array | Cheerio} arr1 - First array.
 * @param {Array | Cheerio} arr2 - Second array.
 * @see {@link https://api.jquery.com/jQuery.merge/}
 *
 * @alias Cheerio.merge
 * @returns {Array | Cheerio} `arr1`, with elements of `arr2` inserted.
 */
exports.merge = function (arr1, arr2) {
  if (!isArrayLike(arr1) || !isArrayLike(arr2)) {
    return;
  }
  var newLength = arr1.length + arr2.length;
  for (var i = 0; i < arr2.length; i++) {
    arr1[i + arr1.length] = arr2[i];
  }
  arr1.length = newLength;
  return arr1;
};

/**
 * @param {any} item - Item to check.
 * @returns {boolean} Indicates if the item is array-like.
 */
function isArrayLike(item) {
  if (Array.isArray(item)) {
    return true;
  }

  if (
    typeof item !== 'object' ||
    !Object.prototype.hasOwnProperty.call(item, 'length') ||
    typeof item.length !== 'number' ||
    item.length < 0
  ) {
    return false;
  }

  for (var i = 0; i < item.length; i++) {
    if (!(i in item)) {
      return false;
    }
  }
  return true;
}
