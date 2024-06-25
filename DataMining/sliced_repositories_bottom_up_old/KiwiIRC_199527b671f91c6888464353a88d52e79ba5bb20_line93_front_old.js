kiwi.front = {

    init: function () {
        kiwi.gateway.nick = 'kiwi_' + Math.ceil(100 * Math.random()) + Math.ceil(100 * Math.random());
        kiwi.gateway.session_id = null;

        kiwi.front.boxes.about = new Box("about");
        $('#tmpl_about_box').tmpl({
        }).appendTo(kiwi.front.boxes.about.content);
        $('#kiwi .toolbars').resize(kiwi.front.ui.doLayoutSize);
        $('#kiwi .formconnectwindow').submit(function () {
            var netsel = $('#kiwi .formconnectwindow .network'),
                netport = $('#kiwi .formconnectwindow .port'),
                netssl = $('#kiwi .formconnectwindow .ssl'),
                netpass = $('#kiwi .formconnectwindow .password'),
                nick = $('#kiwi .formconnectwindow .nick'),
                tmp;
            tmp = nick.val().split(' ');
            kiwi.gateway.nick = tmp[0];
            try {
                kiwi.front.run('/connect ' + netsel.val() + ' ' + netport.val() + ' ' + (netssl.attr('checked') ? 'true' : 'false') + ' ' + netpass.val());
            } catch (e) {
        });
    },
};
