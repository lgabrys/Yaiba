/*global kiwi, _, io, $, iScroll, agent, touchscreen, init_data, plugs, plugins, registerTouches, randomString */
kiwi.front = {


    tabviews: {},
    /**
    *   A list of Boxes
    *   @type Object
    */

    init: function () {
        var about_info, supportsOrientationChange, orientationEvent, scroll_opts, server_tabview;
        kiwi.gateway.nick = 'kiwi_' + Math.ceil(100 * Math.random()) + Math.ceil(100 * Math.random());
        kiwi.gateway.session_id = null;
        kiwi.front.boxes.about = new Box("about");
        about_info = 'UI adapted for ' + agent;
        if (touchscreen) {
            about_info += ' touchscreen ';
        }
        about_info += 'usage';
        $('#tmpl_about_box').tmpl({
        }).appendTo(kiwi.front.boxes.about.content);
        if (touchscreen) {
            scroll_opts = {};
            touch_scroll = new iScroll('windows', scroll_opts);
        }
        $(window).resize(kiwi.front.ui.doLayoutSize);
        $('#nicklist_resize').draggable({axis: "x", drag: function () {

        }});

        $('#kiwi .formconnectwindow').submit(function () {
            var netsel = $('#kiwi .formconnectwindow .network'),
                netport = $('#kiwi .formconnectwindow .port'),
                netssl = $('#kiwi .formconnectwindow .ssl'),
                netpass = $('#kiwi .formconnectwindow .password'),
                nick = $('#kiwi .formconnectwindow .nick'),
                tmp,
            if (nick.val() === '') {
                nick.val('Nick please!');
            }
            tmp = nick.val().split(' ');
            kiwi.gateway.nick = tmp[0];
            try {
                tmp = '/connect ' + netsel.val() + ' ' + netport.val() + ' ';
                tmp += (netssl.is(':checked') ? 'true' : 'false') + ' ' + netpass.val();
            } catch (e) {
        });
        supportsOrientationChange = (typeof window.onorientationchange !==  undefined);
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        if (window.addEventListener) {
        } else {
        }

        server_tabview = new Tabview('server');
        $('#kiwi .cur_topic').keydown(function (e) {
            if (e.which === 13) {
            } else if (e.which === 27) {
                e.preventDefault();
            }
        });
    },
    run: function (msg) {
        var parts, dest, t, pos, textRange, plugin_event, msg_sliced, tab, nick;
        plugin_event = {command: msg};
        plugin_event = kiwi.plugs.run('command_run', plugin_event);
        msg = plugin_event.command.toString();
        if (msg.substring(0, 1) === '/') {
            parts = msg.split(' ');
            switch (parts[0].toLowerCase()) {
                if (typeof parts[2] === 'undefined') {
                    parts[2] = 6667;
                }
                if ((typeof parts[3] === 'undefined') || !parts[3] || (parts[3] === 'false') || (parts[3] === 'no')) {
                    parts[3] = false;
                } else {
                    parts[3] = true;
                }

                if (typeof parts[1] !== "undefined") {
                }
                break;
                if (typeof parts[1] !== "undefined") {
                    tab = new Tabview(parts[1]);
                }
                if (typeof parts[1] !== "undefined") {
                    msg_sliced = msg.split(' ').slice(2).join(' ');
                    tab = Tabview.getTab(parts[1]);
                    if (!tab) {
                        tab = new Tabview(parts[1]);
                    }
                }
                t = msg.split(' ', 3);
                nick = t[1];

                kiwi.gateway.raw(msg.replace(/^\/quote /i, ''));
                tab = Tabview.getCurrentTab();
                dest = parts[1];
                msg = parts.slice(2).join(' ');
                if (parts[1] === undefined) {
                    t = $('.cur_topic');
                    if (t.createTextRange) {
                        pos = t.text().length();
                        textRange = t.createTextRange();
                    } else if (t.setSelectionRange) {
                } else {
                parts = parts.slice(1);
                dest = parts.shift();
                t = parts.shift();
                msg = parts.join(' ');
            }
        } else {
    },
    sync: function () {
    },
    formatIRCMsg: function (msg) {
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
                switch (parseInt(num, 10)) {
                case 15:
                }
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
                        replace += '<span style="' + ((fg !== null) ? 'color: ' + fg + '; ' : '') + ((bg !== null) ? 'background-color: ' + bg + ';' : '') + '">' + str + '</span>';
                        i = to;
                    } else {
                        if ((msg[i] !== '\x03') && (msg[i] !== String.fromCharCode(15))) {
                            replace += msg[i];
                        }
                        i++;
                    }
                }
            }
        }(msg));
    },
};
var ChannelList = function () {
    var chanList, view, table, obj, renderTable, waiting;
    chanList = [];
    view = new Utilityview('Channel List');
    table = $('<table style="margin:1em 2em;"><thead style="font-weight: bold;"><tr><td>Channel Name</td><td>Members</td><td style="padding-left: 2em;">Topic</td></tr></thead><tbody style="vertical-align: top;"></tbody>');
    table = table.appendTo(view.div);
    waiting = false;
    renderTable = function () {
        var tbody;
        tbody = table.children('tbody:first').detach();
        table = table.append(tbody);
        waiting = false;
    };
    return {
        addChannel: function (channels) {
            if (!waiting) {
                waiting = true;
            }
        },
    };
};
var UserList = function (name) {

};
UserList.prototype.width = 100;     // 0 to disable
UserList.prototype.setWidth = function (newWidth) {
    var w, u;
    w = $('#windows');
    u = $('#kiwi .userlist');
};
UserList.prototype.clickHandler = function () {
};
var Utilityview = function (name) {
    var rand_name = randomString(15),
    kiwi.front.utilityviews[rand_name.toLowerCase()] = this;
};
Utilityview.prototype.name = null;
Utilityview.prototype.title = null;
Utilityview.prototype.div = null;
Utilityview.prototype.tab = null;
Utilityview.prototype.topic = ' ';
Utilityview.prototype.panel = null;
Utilityview.prototype.show = function () {
    kiwi.front.cur_channel = this;
};
Utilityview.prototype.setPanel = function (new_panel) {
};
Utilityview.prototype.close = function () {
};
Utilityview.prototype.addPartImage = function () {
};
Utilityview.prototype.clearPartImage = function () {
};
var Tabview = function (v_name) {
    kiwi.front.tabviews[v_name.toLowerCase()] = this;
};
Tabview.prototype.name = null;
Tabview.prototype.div = null;
Tabview.prototype.userlist = null;
Tabview.prototype.tab = null;
Tabview.prototype.topic = "";
Tabview.prototype.safe_to_close = false;                // If we have been kicked/banned/etc from this channel, don't wait for a part message
Tabview.prototype.panel = null;
Tabview.prototype.msg_count = 0;
Tabview.prototype.show = function () {
    var w, u;
    w = $('#windows');
    u = $('#kiwi .userlist');
    kiwi.front.cur_channel = this;
};
Tabview.prototype.close = function () {
};
Tabview.prototype.addPartImage = function () {
};
Tabview.prototype.clearPartImage = function () {
};
Tabview.prototype.setIcon = function (url) {
};
Tabview.prototype.setTabText = function (text) {
};
Tabview.prototype.addMsg = function (time, nick, msg, type, style) {
    var self, tmp, d, re, line_msg;
    self = this;
    tmp = {msg: msg, time: time, nick: nick, tabview: this.name};
    tmp = kiwi.plugs.run('addmsg', tmp);
    msg = tmp.msg;
    time = tmp.time;
    nick = tmp.nick;
    if (time === null) {
        d = new Date();
        time = d.getHours().toString().lpad(2, "0") + ":" + d.getMinutes().toString().lpad(2, "0") + ":" + d.getSeconds().toString().lpad(2, "0");
    }
    if (typeof type !== "string") {
        type = '';
    }
    if (typeof msg !== "string") {
        msg = '';
    }
    re = new RegExp('\\B(' + kiwi.gateway.channel_prefix + '[^ ,.\\007]+)', 'g');
    msg = msg.replace(re, function (match) {
    });
    msg = kiwi.front.formatIRCMsg(msg);
    line_msg = $('<div class="msg ' + type + '"><div class="time">' + time + '</div><div class="nick">' + nick + '</div><div class="text" style="' + style + '">' + msg + ' </div></div>');
};
Tabview.prototype.scrollBottom = function () {
    var panel = this.panel;
    panel[0].scrollTop = panel[0].scrollHeight;
};
Tabview.prototype.changeNick = function (newNick, oldNick) {
    var inChan = this.userlist.hasUser(oldNick);
};
Tabview.prototype.highlight = function () {
};
Tabview.prototype.activity = function () {
};
Tabview.prototype.clearHighlight = function () {
};
Tabview.prototype.changeTopic = function (new_topic) {
};
Tabview.tabExists = function (name) {
};
Tabview.getTab = function (name) {
    var tab;
    $.each(kiwi.front.tabviews, function (i, item) {
        if (item.name.toLowerCase() == name.toLowerCase()) {
        }
    });
};
