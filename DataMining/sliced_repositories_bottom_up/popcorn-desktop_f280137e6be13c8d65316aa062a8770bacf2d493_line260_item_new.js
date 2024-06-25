(function (App) {
    var Item = Marionette.View.extend({
        events: {
        },
        hoverItem: function (e) {
            if (e.pageX !== prevX || e.pageY !== prevY) {
                $(this.el).addClass('selected');
            }
        },
        isAprilFools: function () {
            if (today === '0401') { //april's fool
                var title = this.model.get('title');
                var titleArray = title.split(' ');
                var modified = false;
                if (titleArray.length !== 1) {
                    for (var i = 0; i < titleArray.length; i++) {
                        if (titleArray[i].length > 3 && !modified) {
                            if (Math.floor((Math.random() * 10) + 1) > 5) { //random
                                titleArray[i] = Settings.projectName;
                                modified = true;
                            }
                        }
                    }
                }
            }
        },
        setModelStates: function () {
            var itemtype = this.model.get('type');


            if (itemtype.match('movie')) {
            } else if (itemtype.match('show')) {
            }
        },
        showDetail: function (e) {
            var realtype = this.model.get('type');

            if (realtype === 'bookmarkedmovie') {
                return App.vent.trigger('movie:showDetail', this.model);
            }
        },
        addBookmarked: function () {
            var provider = this.model.get('providers').torrent;
        },
    });
})(window.App);
