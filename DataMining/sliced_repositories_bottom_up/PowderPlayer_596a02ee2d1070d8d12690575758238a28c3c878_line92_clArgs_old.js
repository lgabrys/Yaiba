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
            if (webApiCors)
                res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            const resp = { error: true }
            resp.reason = msg || 'api error'
            res.status(500).send(JSON.stringify(resp))
        }

        function success(res, msg) {
            if (webApiCors)
                res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            const resp = { success: true }
            if (msg)
                resp.response = msg
            res.status(200).send(JSON.stringify(resp))
        }

        app.get('/play', (req, res) => {
            if (((player || {}).wcjs || {}).play) {
                player.wcjs.play()
                success(res)
            } else err(res)
        })

        app.get('/pause', (req, res) => {
            if (((player || {}).wcjs || {}).pause) {
                player.wcjs.pause()
                success(res)
            } else err(res)
        })

        app.get('/toggle_pause', (req, res) => {
            if (((player || {}).wcjs || {}).togglePause) {
                player.wcjs.togglePause()
                success(res)
            } else err(res)
        })

        app.get('/next', (req, res) => {
            if ((player || {}).next) {
                player.next()
                success(res)
            } else err(res)
        })

        app.get('/prev', (req, res) => {
            if ((player || {}).prev) {
                player.prev()
                success(res)
            } else err(res)
        })

        app.get('/item_data', (req, res) => {
            if ((player || {}).itemDesc && ((((player || {}).wcjs || {}).playlist || {}).items || [])[0]) {

                success(res, player.itemDesc())

            } else err(res)
        })

        app.get('/playlist', (req, res) => {
            if (((((player || {}).wcjs || {}).playlist || {}).items || [])[0]) {
                var items = []

                for (i = 0; i < player.wcjs.playlist.items.count; i++)
            } else err(res)
        })
        })
    }).catch(err => {
}
