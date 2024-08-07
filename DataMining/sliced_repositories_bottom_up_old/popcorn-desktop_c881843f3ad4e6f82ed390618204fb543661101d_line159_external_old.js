(function (App) {
	var External = App.Device.Generic.extend({

		play: function (streamModel) {
			if (getPlayerFilenameSwitch(this.get('id')) !== '') {
				var videoFile = _.sortBy(streamModel.attributes.torrent.info.files, function (file) {
				})[0];
			}
		},
		pause: function () {
		},
	});
	var players = {
		'VLC': {
			type: 'vlc',
			cmd: '/Contents/MacOS/VLC',
			switches: '--no-video-title-show',
			subswitch: '--sub-file=',
			stop: 'vlc://quit',
			pause: 'vlc://pause'
		},
		'Fleex player': {
			type: 'fleex-player',
			cmd: '/Contents/MacOS/Fleex player',
			filenameswitch: '-file-name '
		},
		'MPlayer OSX Extended': {
			type: 'mplayer',
			cmd: '/Contents/Resources/Binaries/mpextended.mpBinaries/Contents/MacOS/mplayer',
			switches: '-font "/Library/Fonts/Arial Bold.ttf"',
			subswitch: '-sub '
		},
		'mplayer': {
			type: 'mplayer',
			cmd: 'mplayer',
			switches: '-really-quiet',
			subswitch: '-sub '
		},
		'mpv': {
			type: 'mpv',
			switches: '',
			subswitch: '--sub-file='
		},
		'MPC-HC': {
			type: 'mpc-hc',
			switches: '',
			subswitch: '/sub '
		},
		'MPC-HC64': {
			type: 'mpc-hc',
			switches: '',
			subswitch: '/sub '
		},
		'SMPlayer': {
			type: 'smplayer',
			switches: '',
			subswitch: '-sub ',
			stop: 'smplayer -send-action quit',
			pause: 'smplayer -send-action pause'
		},
	};
	if (process.env.LOCALAPPDATA) {
	}
})(window.App);
