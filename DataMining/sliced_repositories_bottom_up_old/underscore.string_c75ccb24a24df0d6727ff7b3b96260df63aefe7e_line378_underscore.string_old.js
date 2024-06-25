(function(root){
  var nativeTrim = String.prototype.trim;
  var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  var parseNumber = function(source) { return source * 1 || 0; };
  var strRepeat = function(i, m) {
    for (var o = []; m > 0; o[--m] = i);
  };
  var sprintf = (function() {
  })();
  var slice = function(a){
  };
  var defaultToWhiteSpace = function(characters){
  };
  var urlRegex = (function(){
  })();
  var defaultUrlRegex = urlRegex();
  var _s = {

    isURL: function(){
      var schemes = slice(arguments),
          str = schemes.shift(),
          regex = schemes.length ? urlRegex(schemes) : defaultUrlRegex;

      return regex.test(str);
    },

    isBlank: function(str){
      return str == false;
    },

    isEmail: function(str){
      return emailRegex.test(str);
    },

    stripTags: function(str){
      return str.replace(/<\/?[^>]+>/ig, '');
    },

    capitalize : function(str) {
      return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    },

    chop: function(str, step){
      step = step || str.length;
      var arr = [];
      for (var i = 0; i < str.length;) {
        arr.push(str.slice(i,i + step));
        i = i + step;
      }
      return arr;
    },

    clean: function(str){
      return _s.strip(str.replace(/\s+/g, ' '));
    },

    count: function(str, substr){
      var count = 0, index;
      for (var i=0; i < str.length;) {
        index = str.indexOf(substr, i);
        index >= 0 && count++;
        i = i + (index >= 0 ? index : 0) + substr.length;
      }
      return count;
    },

    chars: function(str) {
      return str.split('');
    },

    escapeHTML: function(str) {
      return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                            .replace(/"/g, '&quot;').replace(/'/g, "&apos;");
    },

    unescapeHTML: function(str) {
      return String(str||'').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                            .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
    },

    escapeRegExp: function(str){
      // From MooTools core 1.2.4
      return String(str||'').replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
    },

    insert: function(str, i, substr){
      var arr = str.split('');
      arr.splice(i, 0, substr);
      return arr.join('');
    },

    includes: function(str, needle){
      return str.indexOf(needle) !== -1;
    },

    join: function(sep) {
      var args = slice(arguments);
      return args.join(args.shift());
    },

    lines: function(str) {
      return str.split("\n");
    },

    reverse: function(str){
      return Array.prototype.reverse.apply(str.split('')).join('');
    },

    splice: function(str, i, howmany, substr){
      var arr = str.split('');
      arr.splice(i, howmany, substr);
      return arr.join('');
    },

    startsWith: function(str, starts){
      return str.length >= starts.length && str.substring(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
    },

    succ: function(str){
      var arr = str.split('');
      arr.splice(str.length-1, 1, String.fromCharCode(str.charCodeAt(str.length-1) + 1));
      return arr.join('');
    },

    titleize: function(str){
      var arr = str.split(' '),
          word;
      for (var i=0; i < arr.length; i++) {
        word = arr[i].split('');
        if(typeof word[0] !== 'undefined') word[0] = word[0].toUpperCase();
        i+1 === arr.length ? arr[i] = word.join('') : arr[i] = word.join('') + ' ';
      }
      return arr.join('');
    },

    camelize: function(str){
      return _s.trim(str).replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/\-|\s+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1-$2').replace(/^([A-Z]+)/, '-$1').replace(/\_|\s+/g, '-').toLowerCase();
    },

    trim: function(str, characters){
      if (!characters && nativeTrim) {
        return nativeTrim.call(str);
      }
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('\^[' + characters + ']+|[' + characters + ']+$', 'g'), '');
    },

    ltrim: function(str, characters){
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('\^[' + characters + ']+', 'g'), '');
    },

    rtrim: function(str, characters){
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('[' + characters + ']+$', 'g'), '');
    },

    truncate: function(str, length, truncateStr){
      truncateStr = truncateStr || '...';
      return str.length > length ? str.slice(0,length) + truncateStr : str;
    },

    words: function(str, delimiter) {
      delimiter = delimiter || " ";
      return str.split(delimiter);
    },


    pad: function(str, length, padStr, type) {
      var padding = '',
          padlen  = 0;

      if (!padStr) { padStr = ' '; }
      else if (padStr.length > 1) { padStr = padStr[0]; }
      switch(type) {
        case 'right':
          padlen = (length - str.length);
          padding = strRepeat(padStr, padlen);
          str = str+padding;
          break;
        case 'both':
          padlen = (length - str.length);
          padding = {
            'left' : strRepeat(padStr, Math.ceil(padlen/2)),
            'right': strRepeat(padStr, Math.floor(padlen/2))
          };
          str = padding.left+str+padding.right;
          break;
        default: // 'left'
          padlen = (length - str.length);
          padding = strRepeat(padStr, padlen);;
          str = padding+str;
        }
      return str;
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      return parseNumber(parseNumber(str).toFixed(parseNumber(decimals)));
    },

    strRight: function(sourceStr, sep){
      var pos =  (!sep) ? -1 : sourceStr.indexOf(sep);
      return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
    },

    strRightBack: function(sourceStr, sep){
      var pos =  (!sep) ? -1 : sourceStr.lastIndexOf(sep);
      return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
    },

    strLeft: function(sourceStr, sep){
      var pos = (!sep) ? -1 : sourceStr.indexOf(sep);
      return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
    },

    strLeftBack: function(sourceStr, sep){
      var pos = sourceStr.lastIndexOf(sep);
      return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
    }

  };
}(this || window));
