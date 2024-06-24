function Renderer(options) {
}
Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }
};
Renderer.prototype.blockquote = function(quote) {
};
Renderer.prototype.html = function(html) {
};
Renderer.prototype.heading = function(text, level, raw) {
};
Renderer.prototype.hr = function() {
};
Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
};
Renderer.prototype.listitem = function(text) {
};
Renderer.prototype.paragraph = function(text) {
};
Renderer.prototype.table = function(header, body) {
};
Renderer.prototype.tablerow = function(content) {
};
Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
};
Renderer.prototype.strong = function(text) {
};
Renderer.prototype.em = function(text) {
};
Renderer.prototype.codespan = function(text) {
};
Renderer.prototype.br = function() {
};
Renderer.prototype.del = function(text) {
};
Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
    } catch (e) {
    if (prot.indexOf('javascript:') === 0) {
    }
  }
};
