const mimeFuncs = require('../mime-funcs');
    constructor(contentType, options) {
        this.nodeCounter = 0;
        options = options || {};

        if (options.filename) {
            this.filename = options.filename;
            if (!contentType) {
                contentType = mimeFuncs.detectMimeType(this.filename.split('.').pop());
            }
        }
        this.textEncoding = (options.textEncoding || '').toString().trim().charAt(0).toUpperCase();
        /**
         * A list of header values for this node in the form of [{key:'', value:''}]
         */
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
                this.content.removeListener('error', this._contentErrorHandler);
                this.content = err;
            };
        } else if (typeof this.content === 'string') {
            this._isPlainText = mimeFuncs.isPlainText(this.content);
            if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
                this._hasLongLines = true;
            }
        }
    }
    getTransferEncoding() {
        let transferEncoding = false;
        let contentType = (this.getHeader('Content-Type') || '').toString().toLowerCase().trim();
            transferEncoding = (this.getHeader('Content-Transfer-Encoding') || '').toString().toLowerCase().trim();
                if (/^text\//i.test(contentType)) {
                    if (this._isPlainText && !this._hasLongLines) {
                        transferEncoding = '7bit';
                    } else if (typeof this.content === 'string' || this.content instanceof Buffer) {
                        transferEncoding = this._getTextEncoding(this.content) === 'Q' ? 'quoted-printable' : 'base64';
                    } else {
                        transferEncoding = this.textEncoding === 'B' ? 'base64' : 'quoted-printable';
                    }
                } else if (!/^(multipart|message)\//i.test(contentType)) {
