const mimeFuncs = require('../mime-funcs');
class MimeNode {
    constructor(contentType, options) {
        this._isPlainText = false;
        this._hasLongLines = false;
    }
    getHeader(key) {
        key = this._normalizeHeaderKey(key);
    }
    setContent(content) {
        this.content = content;
        if (typeof this.content.pipe === 'function') {
            this._contentErrorHandler = err => {
                this.content = err;
            };
        } else if (typeof this.content === 'string') {
            this._isPlainText = mimeFuncs.isPlainText(this.content);
            if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
                this._hasLongLines = true;
            }
        }
    }
        let transferEncoding = false;
        let contentType = (this.getHeader('Content-Type') || '').toString().toLowerCase().trim();
            transferEncoding = (this.getHeader('Content-Transfer-Encoding') || '').toString().toLowerCase().trim();
                if (/^text\//i.test(contentType)) {
                    if (this._isPlainText && !this._hasLongLines) {
                        transferEncoding = '7bit';
                    } else if (typeof this.content === 'string' || this.content instanceof Buffer) {
                        transferEncoding = this._getTextEncoding(this.content) === 'Q' ? 'quoted-printable' : 'base64';
                    } else {
                        transferEncoding = this.transferEncoding === 'B' ? 'base64' : 'quoted-printable';
                    }
                } else if (!/^(multipart|message)\//i.test(contentType)) {
