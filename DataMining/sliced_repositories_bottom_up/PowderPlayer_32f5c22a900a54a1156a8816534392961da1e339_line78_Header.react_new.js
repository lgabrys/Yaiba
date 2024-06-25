import Alt from 'alt';
export default new Alt();
N
o
 
l
i
n
e
s
import alt from '../../alt'
class PlayerActions {
    constructor() {
        this.generateActions(
            'play',
            'playItem',
            'pause',
            'prev',
            'next',
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
            'mediaChanged',

            'fullscreen',
            'settingChange',
            'metaUpdate',
            'wcjsInit',
            'close',
            'addPlaylist',
            'togglePlaylist',
            'setPlaylist',
            'parseURL',
            'replaceMRL',

            'itemCount',
            'itemDesc',
            'setDesc',

            'updateImage'
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
import alt from '../../alt'

export
default alt.generateActions('data', 'close', 'open', 'thinking', 'metaUpdate', 'fileSelector');
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    IconButton
}
from 'material-ui';
import PlayerStore from '../store';
import PlayerActions from '../actions';
import ModalActions from '../../Modal/actions';


export
default React.createClass({

    mixins: [History, PureRenderMixin],

    getInitialState() {

        var playerState = PlayerStore.getState();
        return {
            title: playerState.title,
            uiShown: playerState.uiShown && !playerState.playlistOpen,
            playlistOpen: playerState.playlistOpen,
            foundTrakt: playerState.foundTrakt
        }
    },
    componentWillMount() {
        PlayerStore.listen(this.update);
    },
    render() {
        return (
                <IconButton onClick={this.handleClose} iconClassName="material-icons" iconStyle={{color: 'white', fontSize: '40px'}} tooltipPosition="bottom-right" tooltip="Main Menu" className="player-close" >arrow_back</IconButton>
                <p className="title" style={{width: 'calc(100% - '+(this.state.foundTrakt ? '202' : '155')+'px)'}}>{this.state.title}</p>
        );
    }
});
