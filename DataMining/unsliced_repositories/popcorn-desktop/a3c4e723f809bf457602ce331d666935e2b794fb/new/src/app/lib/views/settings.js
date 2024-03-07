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

            // TODO Perhaps add check to make sure its a valid API?
            // Also we should do a full resync
            if (field.attr('name') == 'tvshowApiEndpoint') 
                // add trailing slash
                if (value.substr(-1) != '/') value += '/';
            
            // update active session
            App.settings[field.attr('name')] = value;

            //save to db
            App.db.writeSetting({key: field.attr('name'), value: value}, function() {
                that.ui.success_alert.show().delay(3000).fadeOut(400);

                // TODO : We need to reload all view
                // or ask user to restart app
                if (field.attr('name') == 'language') 
                    // if field is language, set new language
                    // on active session
                    i18n.setLocale(value);
                
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

