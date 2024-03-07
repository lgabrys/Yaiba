(function(App) {
    "use strict";

    var Settings = Backbone.Marionette.ItemView.extend({
        template: '#settings-container-tpl',
        className: 'settings-container-contain',

        ui: {
            success_alert: '.success_alert'
        },

        events: {
            'click .settings-container-close': 'closeSettings',
            'change select,input': 'saveSetting',
            'click .rebuild-tvshows-database': 'rebuildTvShows'
        },

        onShow: function() {
            console.log('Show settings', this.model);
            $(".filter-bar").hide();    
            $("#movie-detail").hide();
        },

        onClose: function() {
            $(".filter-bar").show();    
            $("#movie-detail").show();
        },
        showCover: function() {},

        closeSettings: function() {
            App.vent.trigger('settings:close');     
        },

        saveSetting: function(e){
            var that = this;
            var value = false;
            var data = {};

            // get active field
            var field = $(e.currentTarget);
            
            // get right value
            if(field.is('input')) 
                value = field.val();
            else 
                value = $("option:selected", field).val();

            // update active session
            App.settings[field.attr('name')] = value;

            //save to db
            App.db.writeSetting({key: field.attr('name'), value: value}, function() {
                that.ui.success_alert.show();

                // if field is language, set ne language
                // on active session
                if (field.attr('name') == 'language') {
                    console.log("New lang: " + value);
                    i18n.setLocale(value);
                }
                
            });
        },

        rebuildTvShows: function() {
            // TODO: Add pending screen ?
            Database.initDB(function(err, setting) {

                // we write our new update time
                console.log("Tv SHow Done");
                AdvSettings.set("tvshow_last_sync",+new Date());
            });
        }


    });

    App.View.Settings = Settings;
})(window.App);

