kiwi.front = {


    init: function () {
        var about_info, supportsOrientationChange, orientationEvent, scroll_opts;
        kiwi.gateway.nick = 'kiwi_' + Math.ceil(100 * Math.random()) + Math.ceil(100 * Math.random());
        kiwi.gateway.session_id = null;

        $(kiwi.gateway).bind("onconnect_fail", kiwi.front.onConnectFail);
        $(kiwi.gateway).bind("onlist_end", kiwi.front.onChannelListEnd);
        kiwi.front.boxes.about = new Box("about");
        about_info = 'UI adapted for ' + agent;
        if (touchscreen) {
            about_info += ' touchscreen ';
        }
        about_info += 'usage';
        $('#tmpl_about_box').tmpl({
            about: about_info,
        }).appendTo(kiwi.front.boxes.about.content);
        if (touchscreen) {
            scroll_opts = {};
        }
        $(window).resize(kiwi.front.doLayoutSize);
        $('<div id="nicklist_resize" style="position:absolute; cursor:w-resize; width:5px;"></div>').appendTo('#kiwi');
        $('#nicklist_resize').draggable({axis: "x", drag: function () {
            var t = $(this),
                new_width = $(document).width() - parseInt(t.css('left'), 10);
            new_width = new_width - parseInt($('#kiwi .userlist').css('margin-left'), 10);
            new_width = new_width - parseInt($('#kiwi .userlist').css('margin-right'), 10);
            if (new_width < 20) {
                $(this).data('draggable').offset.click.left = 10;
            }
        }});
        $('#kiwi .formconnectwindow').submit(function () {
                nick = $('#kiwi .formconnectwindow .nick'),
                tmp;
            tmp = nick.val().split(' ');
            kiwi.gateway.nick = tmp[0];
            kiwi.front.doLayout();
        });
        supportsOrientationChange = (typeof window.onorientationchange !==  undefined);
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
        kiwi.front.tabviews.server.userlist_width = 0; // Disable the userlist
    },
    run: function (msg) {
        var parts, dest, t, pos, textRange, d, plugin_event, msg_sliced;
        plugin_event = {command: msg};
        plugin_event = kiwi.plugs.run('command_run', plugin_event);
        msg = plugin_event.command.toString();
        if (msg.substring(0, 1) === '/') {
            parts = msg.split(' ');
            switch (parts[0].toLowerCase()) {
                if (parts[2] === undefined) {
                    parts[2] = 6667;
                }
                if (typeof parts[1] !== "undefined") {
                    msg_sliced = msg.split(' ').slice(2).join(' ');
                }
                dest = parts[1];
                msg = parts.slice(2).join(' ');
                kiwi.gateway.quit(parts.slice(1).join(' '));
            }
        } else {
    },
};
