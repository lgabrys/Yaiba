(function (App) {
        that;
    var SettingsContainer = Marionette.View.extend({
        template: '#settings-container-tpl',
        events: {
            'click #fakedownloadsLocation': 'showDownloadsDirectoryDialog',
            'click .export-database': 'exportDatabase',
            'click #authTrakt': 'connectTrakt',
        },
        onAttach: function () {
            that = this;
            $('.tooltipped').tooltip({
                delay: {
                    'hide': 100
                }
            });

            App.vent.on('viewstack:pop', function() {
                if (_.last(App.ViewStack) === that.className) {
                }
            });
        },
        rightclick_field: function (e) {
            var menu;
            if (/customMoviesServer|customSeriesServer|customAnimeServer/.test(e.target.id)) {
                menu = new this.altcontext_Menu(i18n.__('Cut'), i18n.__('Copy'), i18n.__('Paste'), e.target.id);
            } else {
                menu = new this.context_Menu(i18n.__('Cut'), i18n.__('Copy'), i18n.__('Paste'), e.target.id);
            }
        },
        context_Menu: function (cutLabel, copyLabel, pasteLabel, field) {

        },
        altcontext_Menu: function (cutLabel, copyLabel, pasteLabel, field) {

                paste = new nw.MenuItem({
                    label: pasteLabel || 'Paste',
                });
        },
        closeModal: function (e) {
            } else if (el.attr('id').startsWith('importdb-') || el.attr('id') === 'importdatabase') {
            }
        },
        saveSetting: function (e) {
            var value = false,
                field = $(e.currentTarget),
            switch (field.attr('name')) {
                case 'customMoviesServer':
                    value = field.val().replace(/\s+/g, '');
                    if (value && value.slice(-1) !== '/') {
                        value = value + '/';
                    }
                    value = field.val().replace(/\s+/g, '');
                    value = parseInt(field.val());
                case 'start_screen':
                    if ($('option:selected', field).val() === 'Last Open') {
                        AdvSettings.set('lastTab', App.currentview);
                    }
                case 'defaultFilters':
                    value = $('option:selected', field).val();
                    break;
                    value = $('option:selected', field).val();
                    value = $('option:selected', field).val();
                    value = $('option:selected', field).val();
                    value = field.is(':checked');
                    value = field.is(':checked');
                    value = field.val();
                    value = field.val();
                    let numvalue = field.val().replace(/[^0-9|.-]/gi, '').replace(/^([^.]*\.)|\./g, '$1');
                    if (numvalue <= 0) {
                        numvalue = '';
                    }
                    value = numvalue;
                    let nvalue = field.val().replace(/[^0-9]/gi, '');
                    if (nvalue === '') {
                        nvalue = AdvSettings.get('bigPicture');
                    } else if (nvalue < 25) {
                        nvalue = 25;
                    } else if (nvalue > 400) {
                        nvalue = 400;
                    }
                    value = nvalue;
                    break;
                    let nnvalue = field.val().replace(/[^0-9]/gi, '');
                    if (!nnvalue) {
                        nnvalue = 1;
                    } else {
                        nnvalue = parseInt(nnvalue);
                    }
                    value = nnvalue;
                    value = field.val();
                    if (!value.endsWith(Settings.projectName)) {
                        value = path.join(value, Settings.projectName);
                    }
                case 'downloadsLocation':
                    value = field.val();
            }
            App.settings[field.attr('name')] = value;
            if (tmpLocationChanged) {
                that.moveTmpLocation(value);
            }
            if (downloadsLocationChanged) {
                that.moveDownloadsLocation(value);
            }
            App.db.writeSetting({
                key: field.attr('name'),
                value: value
            }).then(function () {
        },
        syncSetting: function (setting, value) {
            switch (setting) {
                    } else {
                    }
            }
        },
        resetFilter: function () {
            if (!$('.reset-current-filter').hasClass('disabled')) {
                setTimeout(function(){
                }, 100);
            }
        },
        connectOpensubtitles: function (e) {
                OS = require('opensubtitles-api');
            var spinner = $('.opensubtitles-options .loading-spinner');
            if (usn !== '' && pw !== '') {
                var OpenSubtitles = new OS({
                    useragent: Settings.opensubtitles.useragent + ' v' + (Settings.version || 1),
                });
                    }).catch(function (err) {
                        spinner.hide();
                    });
            } else {
            }
        },
        disconnectOpensubtitles: function (e) {
            AdvSettings.set('opensubtitlesAuthenticated', false);
        },
        showFullDatalist: function(e) {
            if (e.button === 0 && (!e.detail || e.detail == 1)) {
            }
        },
    });
})(window.App);
