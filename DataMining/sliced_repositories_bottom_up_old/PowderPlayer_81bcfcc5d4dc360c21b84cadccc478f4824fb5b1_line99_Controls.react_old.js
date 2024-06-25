import Alt from 'alt';
export default new Alt();
N
o
 
l
i
n
e
s
import alt from '../../alt';
import playerActions from './actions';
class playerStore {
    constructor() {
        this.bindActions(playerActions);
        this.uri = false;
        this.title = '';
        this.wcjs = false;
        this.playing = false;
        this.paused = false;
        this.alwaysOnTop = false
        this.muted = false;
        this.volume = 100;
        this.position = 0;
        this.buffering = false;
        this.time = 0;
        this.length = 0;
        this.seekable = false;
        this.files = {};
        this.playlist = {};
        this.fullscreen = false;
        this.uiShown = true;
        this.playlistOpen = false;
        this.currentTime = '00:00';
        this.totalTime = '00:00';
        this.scrobbling = false;
    }
    onSettingChange(setting) {
    }
    onWcjsInit(wcjs) {
    }
    onOpenPlaylist(state = true) {
    }
    onUiShown(toggle) {
    }
    onFullscreen(state) {
    }
    onPosition(pos) {
    }
    onSeekable(state) {
    }
    onLength(length) {
    }
    onTime(time) {
    }
    onOpen(data) {
    }
    onBuffering(perc) {
    }
    onOpening() {
    }
    onScrobble(time) {
        time = parseInt(time);
        if (time < 0) time = 0;
        else if (this.length && time > this.length) time = this.length - 2000;
        this.wcjs.time = time;
    }
    onScrobbleState(toState) {
    }
    onStopped() {
    }
    onVolume(value) {
            value = 150;
            this.wcjs.volume = value
    }
    onMute(mute) {
    }
    onPlaying() {
    }
    onPlay() {
    }
    onPause() {
    }
    onError() {
    }
    onEnded() {
        if (this.time > 0) {
            if (typeof this.lastItem !== 'undefined' && this.position < 0.95) {
                this.wcjs.playlist.currentItem = this.lastItem;
                this.wcjs.position = this.position;
            } else {
        }
    }
    onClose() {
    }
}
default alt.createStore(playerStore);
import alt from '../../alt'
class PlayerActions {
    constructor() {
        this.generateActions(
            'play',
            'pause',
            'stop',
            'stopped',
            'volume',


            'playing',
            'uiShown',
            'position',
            'buffering',
            'seekable',
            'time',
            'length',
            'scrobble',
            'scrobbleState',
            'opening',
            'error',
            'ended',

            'fullscreen',
            'settingChange',
            'metaUpdate',
            'wcjsInit',
            'close',
            'open',
            'openPlaylist',
            'setPlaylist'
        );
    }
    createPlaylist(files) {
    }
    toggleAlwaysOnTop(state = true) {
    }
    togglePowerSave(state = true) {
    }
    toggleFullscreen(state) {
    }
}
default alt.createActions(PlayerActions);
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
}
import PlayerStore from '../store';
import PlayerActions from '../actions';
default React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
    },
    update() {
        if (this.isMounted()) {
            this.setState({
                seekable: PlayerStore.getState().seekable,
                length: PlayerStore.getState().length,
            });
        }
    },
    handleScrobblerHover(event) {
        var percent_done = event.pageX / document.body.clientWidth;
        if (this.state.time) {
            var seekTime = handleTime(percent_done * this.state.length);
        }
    },
});
