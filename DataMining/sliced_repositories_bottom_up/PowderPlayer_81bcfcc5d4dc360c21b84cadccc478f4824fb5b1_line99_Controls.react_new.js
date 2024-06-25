import Alt from 'alt';
export default new Alt();
import alt from '../../alt';
class playerStore {
    constructor() {
        this.wcjs = false;
        this.position = 0;
        this.time = 0;
        this.length = 0;
    }
    onScrobble(time) {
        time = parseInt(time);
        if (time < 0) time = 0;
        else if (this.length && time > this.length) time = this.length - 2000;
        this.wcjs.time = time;
    }
    onVolume(value) {
            value = 150;
            this.wcjs.volume = value
    }
    onEnded() {
        if (this.time > 0) {
            if (typeof this.lastItem !== 'undefined' && this.position < 0.95) {
                this.wcjs.playlist.currentItem = this.lastItem;
                this.wcjs.position = this.position;
            } else {
        }
    }
    onSetItemState(obj) {
        if (obj && typeof obj.idx === 'number') {
            var i = obj.idx;
            if (i > -1 && i < this.wcjs.playlist.items.count) {
                if (this.wcjs.playlist.items[i].setting.length) {
                    var wjsDesc = JSON.parse(this.wcjs.playlist.items[i].setting);
                } else {
                    var wjsDesc = {};
                }
            }
        }
    }
}
import alt from '../../alt'
class PlayerActions {
    constructor() {
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
                currentTime: PlayerStore.getState().currentTime,
            });
        }
    },
    handleScrobblerHover(event) {
        var percent_done = event.pageX / document.body.clientWidth;
        if (this.state.time) {
            var seekTime = handleTime(percent_done * this.state.length, this.state.length);
        }
    },
});
