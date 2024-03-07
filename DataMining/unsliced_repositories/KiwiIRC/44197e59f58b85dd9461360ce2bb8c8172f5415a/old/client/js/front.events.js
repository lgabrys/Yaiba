/*jslint browser: true, devel: true, sloppy: true, plusplus: true, nomen: true, forin: true, continue: true */
/*globals kiwi, $, _, Tabview, Userlist, User, Box, init_data */
/**
*   @namespace
*/
kiwi.front.events = {

    /**
    *   Binds all of the event handlers to their events
    */
    bindAll: function () {
        $(kiwi.gateway).bind('onmsg', this.onMsg)
            .bind('onnotice', this.onNotice)
            .bind('onaction', this.onAction)
            .bind('onmotd', this.onMOTD)
            .bind('onoptions', this.onOptions)
            .bind('onconnect', this.onConnect)
            .bind('onconnect_fail', this.onConnectFail)
            .bind('ondisconnect', this.onDisconnect)
            .bind('onreconnecting', this.onReconnecting)
            .bind('onnick', this.onNick)
            .bind('onuserlist', this.onUserList)
            .bind('onuserlist_end', this.onUserListEnd)
            .bind('onlist_start', this.onChannelListStart)
            .bind('onlist_channel', this.onChannelList)
            .bind('onlist_end', this.onChannelListEnd)
            .bind('onbanlist', this.onBanList)
            .bind('onbanlist_end', this.onBanListEnd)
            .bind('onjoin', this.onJoin)
            .bind('ontopic', this.onTopic)
            .bind('ontopicsetby', this.onTopicSetBy)
            .bind('onpart', this.onPart)
            .bind('onkick', this.onKick)
            .bind('onquit', this.onQuit)
            .bind('onmode', this.onMode)
            .bind('onwhois', this.onWhois)
            .bind('onsync', this.onSync)
            .bind('onchannel_redirect', this.onChannelRedirect)
            .bind('ondebug', this.onDebug)
            .bind('onctcp_request', this.onCTCPRequest)
            .bind('onctcp_response', this.onCTCPResponse)
            .bind('onirc_error', this.onIRCError)
            .bind('onkiwi', this.onKiwi);
    },

    /**
    *   Handles the msg event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onMsg: function (e, data) {
        var destination, plugin_event, tab;
        // Is this message from a user?
        if (data.channel === kiwi.gateway.nick) {
            destination = data.nick.toLowerCase();
        } else {
            destination = data.channel.toLowerCase();
        }

        plugin_event = {nick: data.nick, msg: data.msg, destination: destination};
        plugin_event = kiwi.plugs.run('msg_recieved', plugin_event);
        if (!plugin_event) {
            return;
        }
        
        var chan = kiwi.channels.getByName(plugin_event.destination);
        if (chan) {
            chan.addMsg(null, plugin_event.nick, plugin_event.msg);
        }
    },

    /**
    *   Handles the debug event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onDebug: function (e, data) {
        var tab = Tabview.getTab('kiwi_debug');
        if (!tab) {
            tab = new Tabview('kiwi_debug');
        }
        tab.addMsg(null, ' ', data.msg);
    },

    /**
    *   Handles the action event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onAction: function (e, data) {
        var destination, tab;
        // Is this message from a user?
        if (data.channel === kiwi.gateway.nick) {
            destination = data.nick;
        } else {
            destination = data.channel;
        }

        var chan = kiwi.channels.getByName(destination);
        if (chan) {
            chan.addMsg(null, ' ', '* ' + data.nick + ' ' + data.msg, 'action', 'color:#555;');
        } else {
            kiwi.channels.server.addMsg(null, ' ', '* ' + data.nick + ' ' + data.msg, 'action', 'color:#555;');
        }
    },

    /**
    *   Handles the topic event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onTopic: function (e, data) {
        var chan = kiwi.channels.getByName(data.channel);
        if (chan) {
            chan.set({"topic": data.topic});
            chan.addMsg(null, ' ', '=== Topic for ' + data.channel + ' is: ' + data.topic, 'topic');
        }
    },

    /**
    *   Handles the topicsetby event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onTopicSetBy: function (e, data) {
        var when,
            chan = kiwi.channels.getByName(data.channel);
        if (chan) {
            when = new Date(data.when * 1000).toLocaleString();
            chan.addMsg(null, '', 'Topic set by ' + data.nick + ' at ' + when, 'topic');
        }
    },

    /**
    *   Handles the notice event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onNotice: function (e, data) {
        var nick = (data.nick === undefined) ? '' : data.nick,
            enick = '[' + nick + ']',
            chan;

        chan = kiwi.channels.getByName(data.channel);
        if (chan) {
            chan.addMsg(null, enick, data.msg, 'notice');
        } else {
            kiwi.channels.server.addMsg(null, enick, data.msg, 'notice');
        }
    },

    /**
    *   Handles the CTCP request event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onCTCPRequest: function (e, data) {
        var msg = data.msg.split(" ", 2);
        switch (msg[0]) {
        case 'PING':
            if (typeof msg[1] === 'undefined') {
                msg[1] = '';
            }
            kiwi.gateway.ctcp(false, 'PING', data.nick, msg[1]);
            break;
        case 'TIME':
            kiwi.gateway.ctcp(false, 'TIME', data.nick, (new Date()).toLocaleString());
            break;
        }
        kiwi.channels.server.addMsg(null, 'CTCP Request', '[from ' + data.nick + '] ' + data.msg, 'ctcp');
        
    },

    /**
    *   Handles the CTCP response event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onCTCPResponse: function (e, data) {
        kiwi.channels.server.addMsg(null, 'CTCP Reply', '[from ' + data.nick + '] ' + data.msg, 'ctcp');
    },

    /**
    *   Handles the kiwi event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onKiwi: function (e, data) {
        //console.log(data);
    },

    /**
    *   Handles the connect event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onConnect: function (e, data) {
        var err_box, channels;

        if (data.connected) {
            // Did we disconnect?
            err_box = $('.messages .msg.error.disconnect .text');
            if (typeof err_box[0] !== 'undefined') {
                err_box.text('Reconnected OK :)');
                err_box.parent().removeClass('disconnect');

                // Rejoin channels
                //channels = '';
                //_.each(Tabview.getAllTabs(), function (tabview) {
                //    if (tabview.name === 'server') {
                //        return;
                //    }
                //    channels += tabview.name + ',';
                //});
                //console.log('Rejoining: ' + channels);
                //kiwi.gateway.join(channels);
                return;
            }

            if (kiwi.gateway.nick !== data.nick) {
                kiwi.gateway.nick = data.nick;
                kiwi.front.ui.doLayout();
            }

            kiwi.channels.server.addMsg(null, ' ', '=== Connected OK :)', 'status');
            if (typeof init_data.channel === "string") {
                kiwi.front.joinChannel(init_data.channel);
            }
            kiwi.plugs.run('connect', {success: true});
        } else {
            kiwi.channels.server.addMsg(null, ' ', '=== Failed to connect :(', 'status');
            kiwi.plugs.run('connect', {success: false});
        }

        // Now that we're connected, warn the user if they really want to quit
        kiwi.front.ui.preventRefresh();
    },
    /**
    *   Handles the connectFail event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onConnectFail: function (e, data) {
        var reason = (typeof data.reason === 'string') ? data.reason : '';
        kiwi.channels.server.addMsg(null, '', 'There\'s a problem connecting! (' + reason + ')', 'error');
        kiwi.plugs.run('connect', {success: false});
    },
    /**
    *   Handles the disconnect event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onDisconnect: function (e, data) {
        var tab, tabs;
        //tabs = Tabview.getAllTabs();
        //for (tab in tabs) {
        //    tabs[tab].addMsg(null, '', 'Disconnected from server!', 'error disconnect');
        //}
        kiwi.plugs.run('disconnect', {success: false});
    },
    /**
    *   Handles the reconnecting event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onReconnecting: function (e, data) {
        var err_box, f, msg, mins, secs;

        err_box = $('.messages .msg.error.disconnect .text');
        if (!err_box) {
            return;
        }

        /**
        *   @inner
        */
        f = function (num) {
            switch (num) {
            case 1: return 'First';
            case 2: return 'Second';
            case 3: return 'Third';
            case 4: return 'Fourth';
            case 5: return 'Fifth';
            case 6: return 'Sixth';
            case 7: return 'Seventh';
            default: return 'Next';
            }
        };

        secs = Math.floor(data.delay / 1000);
        mins = Math.floor(secs / 60);
        secs = secs % 60;
        if (mins > 0) {
            msg = f(data.attempts) + ' attempt at reconnecting in ' + mins + ' minute' + ((mins > 1) ? 's' : '') + ', ' + secs + ' second' + (((secs > 1) || (secs === 0)) ? 's' : '') + '...';
        } else {
            msg = f(data.attempts) + ' attempt at reconnecting in ' + secs + ' second' + (((secs > 1) || (secs === 0)) ? 's' : '') + '...';
        }

        err_box.text(msg);
    },
    /**
    *   Handles the options event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onOptions: function (e, data) {
        if (typeof kiwi.gateway.network_name === "string" && kiwi.gateway.network_name !== "") {
            kiwi.channels.server.set({"name": kiwi.gateway.network_name});
        }
    },
    /**
    *   Handles the MOTD event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onMOTD: function (e, data) {
        kiwi.channels.server.addMsg(null, data.server, data.msg, 'motd');
    },
    /**
    *   Handles the whois event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onWhois: function (e, data) {
        /*globals secondsToTime */
        var d, tab, idle_time = '';

        if (data.end) {
            return;
        }

        if (typeof data.idle !== 'undefined') {
            idle_time = secondsToTime(parseInt(data.idle, 10));
            idle_time = idle_time.h.toString().lpad(2, "0") + ':' + idle_time.m.toString().lpad(2, "0") + ':' + idle_time.s.toString().lpad(2, "0");
        }

        tab = kiwi.currentPanel;
        if (data.msg) {
            tab.addMsg(null, data.nick, data.msg, 'whois');
        } else if (data.logon) {
            d = new Date();
            d.setTime(data.logon * 1000);
            d = d.toLocaleString();

            tab.addMsg(null, data.nick, 'idle for ' + idle_time + ', signed on ' + d, 'whois');
        } else {
            tab.addMsg(null, data.nick, 'idle for ' + idle_time, 'whois');
        }
    },
    /**
    *   Handles the mode event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onMode: function (e, data) {
        var tab, mem;
        if ((typeof data.channel === 'string') && (typeof data.effected_nick === 'string')) {
            chan = kiwi.channels.getByName(data.channel);
            if (chan) {
                chan.addMsg(null, ' ', '[' + data.mode + '] ' + data.effected_nick + ' by ' + data.nick, 'mode', '');
                mem = _.detect(chan.get("members"), function (m) {
                    return data.effected_nick === m.get("nick");
                });
                if (mem) {
                    if (data.mode[0] === '+') {
                        mem.addMode(data.mode);
                    } else {
                        mem.removeMode(data.mode);
                    }
                }
            }
        }
        // TODO: Other mode changes that aren't +/- qaohv. - JA
    },
    /**
    *   Handles the userList event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onUserList: function (e, data) {
        var tab, chan;
        chan = kiwi.channels.getByName(data.channel);
        if (chan) {
            if ((!kiwi.front.cache.userlist) || (!kiwi.front.cache.userlist.updating)) {
                if (!kiwi.front.cache.userlist) {
                    kiwi.front.cache.userlist = {updating: true};
                } else {
                    kiwi.front.cache.userlist.updating = true;
                }
                chan.get("members").reset([],{"silent": true});
            }
            _.forEach(data.users, function (u) {
                chan.get("members").add(new kiwi.model.Member(u), {"silent": true});
            });
        }
    },
    /**
    *   Handles the userListEnd event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onUserListEnd: function (e, data) {
        var chan;
        if (!kiwi.front.cache.userlist) {
            kiwi.front.cache.userlist = {};
        }
        kiwi.front.cache.userlist.updating = false;
        chan = kiwi.channels.getByName(data.channel);
        if (chan) {
            chan.get("members").trigger("change");
        }
    },

    /**
    *   Handles the channelListStart event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onChannelListStart: function (e, data) {
        /*global ChannelList */
        kiwi.front.cache.list = new ChannelList();
        console.profile('list');
    },
    /**
    *   Handles the channelList event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onChannelList: function (e, data) {
        kiwi.front.cache.list.addChannel(data.chans);
    },
    /**
    *   Handles the channelListEnd event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onChannelListEnd: function (e, data) {
        kiwi.front.cache.list.show();
        console.profileEnd();
    },

    /**
    *   Handles the banList event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onBanList: function (e, data) {
    },

    /**
    *   Handles the banListEnd event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onBanListEnd: function (e, data) {
    },

    /**
    *   Handles the join event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onJoin: function (e, data) {
        var chan = kiwi.channels.getByName(data.channel);
        if (!chan) {
            chan = new kiwi.model.Channel({"name": data.channel.toLowerCase()});
            kiwi.channels.add(chan);
            // No need to add ourselves to the MemberList as RPL_NAMESREPLY will be next
            chan.view.show();
        } else {
            chan.get("members").add(new kiwi.model.Member({"nick": data.nick, "modes": [], "ident": data.ident, "hostname": data.hostname}));
        }
    },
    /**
    *   Handles the part event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onPart: function (e, data) {
        var chan, members, cid;
        chan = kiwi.channels.getByName(data.channel);
        if (chan) {
            if (data.nick === kiwi.gateway.nick) {
                chan.trigger("close");
            } else {
                members = chan.get("members");
                members.remove(members.detect(function (m) {
                    return data.nick === m.get("nick");
                }).cid, {"message": data.message})
            }
        }
    },
    /**
    *   Handles the kick event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onKick: function (e, data) {
        var panel = kiwi.channels.getByName(data.channel);
        if (panel) {
            // If this is us, close the panel
            if (data.kicked === kiwi.gateway.nick) {
                kiwi.channels.remove(panel);
                kiwi.channels.server.addMsg(null, ' ', '=== You have been kicked from ' + data.channel + '. ' + data.message, 'status kick');
                return;
            }

            panel.addMsg(null, ' ', '<-- ' + data.kicked + ' kicked by ' + data.nick + '(' + data.message + ')', 'action kick', 'color:#990000;');
            panel.userlist.removeUser(data.nick);
        }
    },
    /**
    *   Handles the nick event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onNick: function (e, data) {
        if (data.nick === kiwi.gateway.nick) {
            kiwi.gateway.nick = data.newnick;
            kiwi.front.ui.doLayout();
        }

        kiwi.channels.each(function (panel) {
            if (panel.isChannel) {
                var member = panel.get("members").getByNick(data.nick);
                if (member) {
                    member.set({"nick": data.newnick});
                    panel.addMsg(null, ' ', '=== ' + data.nick + ' is now known as ' + data.newnick, 'action changenick');
                }
            }
        });
    },
    /**
    *   Handles the quit event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onQuit: function (e, data) {
        var chan, members, member;
        kiwi.channels.forEach(function (chan) {
            members = chan.get("members");
            member = members.detect(function (m) {
                return data.nick === m.get("nick");
            });
            if (member) {
                members.trigger("quit", {"member": member, "message": data.message});
                members.remove(member.cid);
            }
        });
    },
    /**
    *   Handles the channelRedirect event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onChannelRedirect: function (e, data) {
        //var tab = Tabview.getTab(data.from);
        //tab.close();
        //tab = new Tabview(data.to);
        //tab.addMsg(null, ' ', '=== Redirected from ' + data.from, 'action');
    },

    /**
    *   Handles the IRCError event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onIRCError: function (e, data) {
        /*var t_view,
            tab = Tabview.getTab(data.channel);
        if (data.channel !== undefined && tab) {
            t_view = data.channel;
        } else {
            t_view = 'server';
            tab = Tabview.getServerTab();
        }

        switch (data.error) {
        case 'banned_from_channel':
            tab.addMsg(null, ' ', '=== You are banned from ' + data.channel + '. ' + data.reason, 'status');
            if (t_view !== 'server') {
                tab.safe_to_close = true;
            }
            break;
        case 'bad_channel_key':
            tab.addMsg(null, ' ', '=== Bad channel key for ' + data.channel, 'status');
            if (t_view !== 'server') {
                tab.safe_to_close = true;
            }
            break;
        case 'invite_only_channel':
            tab.addMsg(null, ' ', '=== ' + data.channel + ' is invite only.', 'status');
            if (t_view !== 'server') {
                tab.safe_to_close = true;
            }
            break;
        case 'channel_is_full':
            tab.addMsg(null, ' ', '=== ' + data.channel + ' is full.', 'status');
            if (t_view !== 'server') {
                tab.safe_to_close = true;
            }
            break;
        case 'chanop_privs_needed':
            tab.addMsg(null, ' ', '=== ' + data.reason, 'status');
            break;
        case 'no_such_nick':
            Tabview.getServerTab().addMsg(null, ' ', '=== ' + data.nick + ': ' + data.reason, 'status');
            break;
        case 'nickname_in_use':
            Tabview.getServerTab().addMsg(null, ' ', '=== The nickname ' + data.nick + ' is already in use. Please select a new nickname', 'status');
            kiwi.front.ui.showChangeNick('That nick is already taken');
            break;
        default:
            // We don't know what data contains, so don't do anything with it.
            console.log(e, data);
        }*/
    },







    /**
    *   Handles the sync event
    *   @param  {eventObject}   e       The event object
    *   @param  {Object}        data    The event data
    */
    onSync: function (e, data) {
        // Set any settings
        if (data.nick !== undefined) {
            kiwi.gateway.nick = data.nick;
        }

        // Add the tabviews
        if (data.tabviews !== undefined) {
            _.each(data.tabviews, function (tab) {
                var newTab;
                if (!Tabview.tabExists(tab.name)) {
                    newTab = new Tabview(kiwi.gateway.channel_prefix + tab.name);

                    if (tab.userlist !== undefined) {
                        kiwi.front.events.onUserList({'channel': kiwi.gateway.channel_prefix + tab.name, 'users': tab.userlist.getUsers(false)});
                    }
                }
            });
        }

        kiwi.front.ui.doLayout();
    }


};