function manageDebug(debug) {
    var log, consoleBackUp;
    if (window.console) {
        consoleBackUp = window.console.log;
        window.console.log = function () {
        };
    } else {
        log = window.opera ? window.opera.postError : alert;
        window.console = {};
        window.console.log = function (str) {
        };
    }
}
function randomString(string_length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
        randomstring = '',
        i,
        rnum;
    for (i = 0; i < string_length; i++) {
        rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
}
if (typeof String.prototype.trim === 'undefined') {
    String.prototype.trim = function () {
    };
}
if (typeof String.prototype.lpad === 'undefined') {
    String.prototype.lpad = function (length, character) {
    };
}
function secondsToTime(secs) {
    var hours, minutes, seconds, divisor_for_minutes, divisor_for_seconds, obj;
    hours = Math.floor(secs / (60 * 60));
    divisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(divisor_for_minutes / 60);
    divisor_for_seconds = divisor_for_minutes % 60;
    seconds = Math.ceil(divisor_for_seconds);
    obj = {
    };
}
function formatIRCMsg (msg) {
    var re, next;
    if (msg.indexOf(String.fromCharCode(2)) !== -1) {
        next = '<b>';
        while (msg.indexOf(String.fromCharCode(2)) !== -1) {
            msg = msg.replace(String.fromCharCode(2), next);
            next = (next === '<b>') ? '</b>' : '<b>';
        }
        if (next === '</b>') {
            msg = msg + '</b>';
        }
    }
    if (msg.indexOf(String.fromCharCode(31)) !== -1) {
        next = '<u>';
        while (msg.indexOf(String.fromCharCode(31)) !== -1) {
            msg = msg.replace(String.fromCharCode(31), next);
            next = (next === '<u>') ? '</u>' : '<u>';
        }
        if (next === '</u>') {
            msg = msg + '</u>';
        }
    }
    msg = (function (msg) {
        var replace, colourMatch, col, i, match, to, endCol, fg, bg, str;
        replace = '';
        colourMatch = function (str) {
        };
        col = function (num) {
        };
        if (msg.indexOf('\x03') !== -1) {
            i = msg.indexOf('\x03');
            replace = msg.substr(0, i);
            while (i < msg.length) {
                match = colourMatch(msg.substr(i, 6));
                if (match) {
                    to = msg.indexOf('\x03', i + 1);
                    endCol = msg.indexOf(String.fromCharCode(15), i + 1);
                    if (endCol !== -1) {
                        if (to === -1) {
                            to = endCol;
                        } else {
                            to = ((to < endCol) ? to : endCol);
                        }
                    }
                    if (to === -1) {
                        to = msg.length;
                    }
                    fg = col(match[1]);
                    bg = col(match[3]);
                    str = msg.substring(i + 1 + match[1].length + ((bg !== null) ? match[2].length + 1 : 0), to);
                } else {
            }
        }
    }(msg));
}
