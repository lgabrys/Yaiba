// TODO: Channel modes
// TODO: Listen to gateway events for anythign related to this channel
_kiwi.model.Channel = _kiwi.model.Panel.extend({
    initialize: function (attributes) {
            members;
        this.set({
            "scrollback": [],
        }, {"silent": true});
        members = this.get("members");
        members.channel = this;
        members.bind("remove", function (member, members, options) {
            var show_message = _kiwi.global.settings.get('show_joins_parts');
            } else if (show_message) {

            }
        }, this);
    },
    addMsg: function (nick, msg, type, opts) {
        var message_obj, bs, d, members, member,
            scrollback = (parseInt(_kiwi.global.settings.get('scrollback'), 10) || 250);
        opts = opts || {};
        if (typeof opts.time === 'number') {
            opts.time = new Date(opts.time);
        } else {
            opts.time = new Date();
        }
        if (!opts || typeof opts.style === 'undefined') {
            opts.style = '';
        }
        message_obj = {"msg": msg, "date": opts.date, "time": opts.time, "nick": nick, "chan": this.get("name"), "type": type, "style": opts.style};
        members = this.get('members');
        if (members) {
            member = members.getByNick(message_obj.nick);
            if (member) {
                message_obj.nick_prefix = member.get('prefix');
            }
        }
        if (typeof message_obj.type !== "string") {
            message_obj.type = '';
        }
        if (typeof message_obj.msg !== "string") {
            message_obj.msg = '';
        }
        bs = this.get("scrollback");
        if (bs) {
            if (bs.length > scrollback) {
                bs = _.last(bs, scrollback);
            }
        }
    },
});
