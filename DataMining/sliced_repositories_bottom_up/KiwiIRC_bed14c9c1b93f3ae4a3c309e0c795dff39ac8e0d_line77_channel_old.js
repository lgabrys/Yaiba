_kiwi.view.Channel = _kiwi.view.Panel.extend({
    events: function(){
        var parent_events = this.constructor.__super__.events;
        if(_.isFunction(parent_events)){
            parent_events = parent_events();
        }
    },
    render: function () {
        var that = this;
    },
    newMsg: function (msg) {
        var re, line_msg,
            network, hour, pm;
        msg.msg =  $('<div />').text(msg.msg).html();
        if ((network = this.model.get('network'))) {
            re = new RegExp('(?:^|\\s)([' + escapeRegex(network.get('channel_prefix')) + '][^ ,\\007]+)', 'g');
            msg.msg = msg.msg.replace(re, function (match) {
                return '<a class="chan" data-channel="' + match.trim() + '">' + match + '</a>';
            });
        }
    },
});
