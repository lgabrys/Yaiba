import Alt from 'alt';
export default new Alt();
import alt from '../../alt'

export
default alt.generateActions('data', 'close', 'open', 'thinking', 'metaUpdate', 'fileSelector', 'setIndex', 'shouldExit', 'plugin', 'installedPlugin', 'searchPlugin', 'searchPlugins', 'torrentSelector', 'torrentWarning');
import alt from '../alt';
class torrentActions {

    constructor() {
        this.generateActions(
            'add',
            'clear'
        );
    }
    addTorrent(torrent) {
    }
}
default alt.createActions(torrentActions);
import alt from '../../alt'

export
default alt.generateActions('open', 'close');
import ModalActions from '../components/Modal/actions';
import sorter from '../components/Player/utils/sort';
import TorrentActions from '../actions/torrentActions';
import MessageActions from '../components/Message/actions';
import url from 'url';
var getParam = (el, arg) => {
}
var webApiCors = false
function startWebApi(el) {
    const getPort = require('get-port')
    getPort({ port: (el.includes('=') ? parseInt(el.split('=')[1]) : 5090) }).then(port => {
        const express = require('express')
        const app = express()
        const player = require('../components/Player/utils/player')
        function err(res, msg) {
        }

        function success(res, msg) {
            if (msg)
        }
        app.get('/toggle_pause', (req, res) => {
            if (((player || {}).wcjs || {}).togglePause) {
            } else err(res)
        })
        app.get('/playlist', (req, res) => {
            if (((((player || {}).wcjs || {}).playlist || {}).items || [])[0]) {
                for (var i = 0; i < player.wcjs.playlist.items.count; i++)
            } else err(res)
        })
    }).catch(err => {
}
