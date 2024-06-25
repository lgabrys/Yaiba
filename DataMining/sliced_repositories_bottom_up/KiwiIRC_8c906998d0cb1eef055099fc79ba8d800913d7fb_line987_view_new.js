/*jslint white:true, regexp: true, nomen: true, devel: true, undef: true, browser: true, continue: true, sloppy: true, forin: true, newcap: true, plusplus: true, maxerr: 50, indent: 4 */

kiwi.view.MemberList = Backbone.View.extend({
    render: function () {
        var $this = $(this.el);
    },
    nickClick: function (x) {
        var target = $(x.currentTarget).parent('li'),
            member = target.data('member'),
            userbox = new kiwi.view.UserBox();

        userbox.member = member;
    },
});
kiwi.view.UserBox = Backbone.View.extend({
    events: {
        'click .info': 'infoClick'
    },
    queryClick: function (event) {
    },
});
kiwi.view.NickChangeBox = Backbone.View.extend({
});
kiwi.view.ServerSelect = function () {
    var state = 'all';
    var model = Backbone.View.extend({
        submitForm: function (event) {
            if (state === 'nick_change') {
            } else {
        },
        show: function (new_state) {
            new_state = new_state || 'all';
            state = new_state;
        },
    });
};
kiwi.view.Panel = Backbone.View.extend({
    newMsg: function (msg) {
        // Make links clickable
    },
});
kiwi.view.Applet = kiwi.view.Panel.extend({
});
kiwi.view.Channel = kiwi.view.Panel.extend({
});
kiwi.view.Tabs = Backbone.View.extend({
});
kiwi.view.TopicBar = Backbone.View.extend({

});
kiwi.view.ControlBox = Backbone.View.extend({
    process: function (ev) {
            inp = $(ev.currentTarget),
            meta;
        if (navigator.appVersion.indexOf("Mac") !== -1) {
            meta = ev.ctrlKey;
        } else {
            meta = ev.altKey;
        }

        switch (true) {

            if (inp_val) {
            }
            if (this.buffer_pos > 0) {
                this.buffer_pos--;
                inp.val(this.buffer[this.buffer_pos]);
            }
            if (this.buffer_pos < this.buffer.length) {
                this.buffer_pos++;
            }
        case (ev.keyCode === 37 && meta):            // left
            if (_.isEqual(this.tabcomplete.data, [])) {
                var ac_data = [];
                ac_data = _.sortBy(ac_data, function (nick) {
                    return nick;
                });
            }
            (function () {
                if (this.tabcomplete.data.length > 0) {
                    } else if (inp[0].createTextRange) { // not sure if this bit is actually needed....
                    }
                }
            }).apply(this);
        }
    },
    processInput: function (command_raw) {
        // The default command
    }
});
kiwi.view.StatusMessage = Backbone.View.extend({
});
kiwi.view.ResizeHandler = Backbone.View.extend({
});
kiwi.view.Application = Backbone.View.extend({
    initialize: function () {
        window.onbeforeunload = function () {
        };
    },
    alertWindow: function (title) {
        if (!this.alertWindowTimer) {
            this.alertWindowTimer = new (function () {
                var that = this;
                var default_title = 'Kiwi IRC';
                this.setTitle = function (new_title) {
                    new_title = new_title || default_title;
                    window.document.title = new_title;
                };
                $(window).focus(function (event) {
                    setTimeout(that.reset, 2000);
                });
            })();
        }
    },
});
