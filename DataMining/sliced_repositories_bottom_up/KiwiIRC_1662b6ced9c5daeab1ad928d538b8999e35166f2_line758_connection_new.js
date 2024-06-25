var net             = require('net'),
    IrcUser         = require('./user.js'),
    iconv           = require('iconv-lite'),
var parse_regex = /^(?:(?:(?:@([^ ]+) )?):(?:([a-z0-9\x5B-\x60\x7B-\x7D\.\-*]+)|([a-z0-9\x5B-\x60\x7B-\x7D\.\-*]+)!([^\x00\r\n\ ]+?)@?([a-z0-9\.\-:\/_]+)?) )?(\S+)(?: (?!:)(.+?))?(?: :(.+))?$/i;
function parseIrcLine(buffer_line) {
    var msg,
        i, j,
        tags = [],
        tag,
        line = '';
    line = iconv.decode(buffer_line, this.encoding);
    if (!line) return;
    msg = parse_regex.exec(line.replace(/^\r+|\r+$/, ''));
    if (msg[1]) {
        tags = msg[1].split(';');
        for (j = 0; j < tags.length; j++) {
            tag = tags[j].split('=');
            tags[j] = {tag: tag[0], value: tag[1]};
        }
    }
    msg = {
        tags:       tags,
        prefix:     msg[2],
        nick:       msg[3],
        ident:      msg[4],
        hostname:   msg[5] || '',
        command:    msg[6],
        params:     msg[7] || '',
        trailing:   (msg[8]) ? msg[8].trim() : ''
    };
    msg.params = msg.params.split(/ +/);
}
