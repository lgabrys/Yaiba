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
    }
}

export
default alt.createStore(playerStore);
import alt from '../../alt'
import player from './utils/player';
class PlayerActions {

    announcement(obj) {
        var announcer = {};
        if (typeof obj === 'string') obj = {
        };
        announcer.text = obj.text;
        if (!obj.delay) obj.delay = 2000;
        clearTimeout(player.announceTimer);
            obj.effect = !player.announceEffect;
    }
    setDesc(obj) {
        var wcjs = player.wcjs;
            obj.idx = wcjs.playlist.currentItem;
        if (obj && typeof obj.idx === 'number') {
            var i = obj.idx;
                wcjs.playlist.items[i].title = obj.title;
            if (i > -1 && i < wcjs.playlist.items.count) {
                if (wcjs.playlist.items[i].setting.length)
                    var wjsDesc = JSON.parse(wcjs.playlist.items[i].setting);
                else
                    var wjsDesc = {};
                    for (var key in obj)
                            wjsDesc[key] = obj[key];
                wcjs.playlist.items[i].setting = JSON.stringify(wjsDesc);
            }
        }
    }
    addPlaylist(data) {
        var wcjs = player.wcjs;
        } else {
            for (var i = 0; data[i]; i++) {
                if (typeof data[i] === 'string') {
                    wcjs.playlist.add(data[i]);
                } else if (data[i].uri) {
                        wcjs.playlist.items[wcjs.playlist.items.count - 1].title = data[i].title;
                    data[i].idx = wcjs.playlist.items.count - 1;
                        });
                }
            }
        }
    }

    replaceMRL(newObj) {

        var progressState = this.alt.stores.ProgressStore.getState();
        var wcjs = player.wcjs;
        var newX = newObj.x;
        var newMRL = newObj.mrl;
            wcjs.playlist.items[wcjs.playlist.items.count - 1].title = newMRL.title;

        var swapDifference = wcjs.playlist.items.count - newX - 1;
        if (newX == wcjs.playlist.currentItem && [3, 4].indexOf(wcjs.state) > -1) {
            var playerPos = progressState.position;
            wcjs.position = playerPos;
        } else wcjs.playlist.advanceItem(newDifference, swapDifference * (-1));
        wcjs.playlist.items[newX].setting = wcjs.playlist.items[newX + 1].setting;
    }
    pulse() {
    }
    flood() {
    }
    updateImage(image) {
    }
    toggleAlwaysOnTop(state = true) {
    }
    togglePowerSave(state = true) {
    }
}
default alt.createActions(PlayerActions);
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
N
o
 
l
i
n
e
s
import shell from 'shell';
import child from 'child_process';
import fs from 'fs';
const app = require('remote').require('app');
const dataPath = app.getPath('userData');
var register = {};
register._writeDesktopFile = cb => {
    var powderPath = process.execPath.substr(0,process.execPath.lastIndexOf("/")+1);
    fs.writeFile(dataPath + '/powder.desktop', '[Desktop Entry]\n'+
        'Version=1.0\n'+
        'Name=Powder Player\n'+
        'Comment=Powder Player is a hybrid between a Torrent Client and a Player (torrent streaming)\n'+
        'Exec=' + process.execPath + ' %U\n'+
        'Path=' + powderPath + '\n'+
        'Icon=' + powderPath + 'icon.png\n'+
        'Terminal=false\n'+
        'Type=Application\n'+
        'MimeType=application/x-bittorrent;x-scheme-handler/magnet;x-scheme-handler/pow;video/avi;video/msvideo;video/x-msvideo;video/mp4;video/x-matroska;video/mpeg;\n'+
        '', cb);
};
register.torrent = () => {
    if (process.platform == 'linux') {
        this._writeDesktopFile(err => {
            if (err) throw err;
            var desktopFile = dataPath+'/powder.desktop';
            var tempMime = 'application/x-bittorrent';
            child.exec('gnome-terminal -x bash -c "echo \'Associating Files or URls with Applications requires Admin Rights\'; echo; sudo echo; sudo echo \'Authentication Successful\'; sudo echo; sudo mv -f '+desktopFile+' /usr/share/applications; sudo xdg-mime default powder.desktop '+tempMime+'; sudo gvfs-mime --set '+tempMime+' powder.desktop; echo; echo \'Association Complete! Press any key to close ...\'; read" & disown');
        });
    } else if (process.platform == 'darwin') {
        var powderPath = process.execPath.substr(0,process.execPath.lastIndexOf("/")+1)+"../../../../Resources/app.nw/";
        child.exec('"'+powderPath+'src/duti/duti" -s media.powder.player .torrent viewer');
        alert("Successfully Associated with Torrent Files");
    } else {
        fs.writeFile(dataPath+'\\register-torrent.reg', 'REGEDIT4\r\n'+
            '[HKEY_CURRENT_USER\\Software\\Classes\\powder.player.v1\\DefaultIcon]\r\n'+
            '@="' + process.execPath.split("\\").join("\\\\") + '"\r\n'+

            '[HKEY_CURRENT_USER\\Software\\Classes\\powder.player.v1\\shell\\open\\command]\r\n'+
            '@="\\"' + process.execPath.split("\\").join("\\\\") + '\\" \\"%1\\""\r\n'+

            '[HKEY_CURRENT_USER\\Software\\Classes\\.torrent]\r\n'+
            '@="powder.player.v1"\r\n'+
            '"Content Type"="application/x-bittorrent"', err => {
                if (err) throw err;
                shell.openItem(dataPath+'\\register-torrent.reg');
            });
    }
};
import React from 'react';
import _ from 'lodash';
import MUI from 'material-ui';
const {
    RaisedButton, Toggle, Tabs, Tab, TextField, IconButton
} = MUI;
import PlayerStore from '../store';
import PlayerActions from '../actions';
import SubtitleStore from './SubtitleText/store';
import SubtitleActions from './SubtitleText/actions';
import traktUtil from '../utils/trakt';
import ModalActions from './Modal/actions';
import Register from '../../../utils/registerUtil';
import player from '../utils/player';
import ls from 'local-storage';
var injectTapEventPlugin = require("react-tap-event-plugin");
import webFrame from 'web-frame';
const dialog = require('remote').require('dialog');
default React.createClass({
    childContextTypes: {
    },
    getInitialState() {
    },
    componentWillMount() {

    },
    componentDidMount() {
        player.set({
            fields: {
                audioTrack: this.refs['audioTrackInput'],
                aspect: this.refs['aspectInput'],
            }
        });
    },
    render() {

        var renderObj = {

            'General': [{
                type: 'header',
                label: 'Interface'
            }, {
                type: 'toggle',
                title: 'Always on Top',
                tag: 'alwaysOnTop',
                func: 'AlwaysOnTop'
            }, {
                type: 'toggle',
                title: 'Click to Pause',
                tag: 'clickPause',
                func: 'ClickPause'
            }, {
                type: 'toggle',
                title: 'Player Ripple Effects',
                tag: 'playerRippleEffects',
                func: 'RippleEffects'
            }, {
                type: 'toggle',
                title: 'Notifications',
                tag: 'playerNotifs'
            }, {
                type: 'select',
                title: 'Zoom Level',
                tag: 'zoomLevel',
                default: this.state.zoomLevel + '',
                disabled: true,
                width: '30px'
            }, {
                type: 'header',
                label: 'Performance'
            }, {
                type: 'toggle',
                title: 'Render when UI Hidden',
                tag: 'renderHidden'
            }, {
                type: 'select',
                title: 'Render Frequency',
                tag: 'renderFreq',
                default: this.state.renderFreq + 'ms',
                width: '80px'
            }, {
                type: 'header',
                label: 'Playback'
            }, {
                type: 'select',
                title: 'Speed',
                tag: 'speed',
                default: parseFloat(Math.round(this.state.speed * 100) / 100).toFixed(2) + 'x',
                width: '60px'
            }, {
                type: 'select',
                title: 'Buffer Size',
                tag: 'bufferSize',
                default: this.state.bufferSize+' sec',
                width: '60px'
            }, {
                type: 'header',
                label: 'Video'
            }, {
                type: 'select',
                title: 'Aspect Ratio',
                tag: 'aspect',
                default: player.aspect,
                width: '60px',
                disabled: true
            }, {
                type: 'select',
                title: 'Crop',
                tag: 'crop',
                default: player.crop,
                width: '60px',
                disabled: true
            }, {
                type: 'select',
                title: 'Zoom',
                tag: 'zoom',
                default: 'Default',
                width: '90px',
                disabled: true
            }, {
                type: 'header',
                label: 'Associations'
            }, {
                type: 'button',
                title: 'Magnet Links',
                func: Register.magnet
            }, {
                type: 'button',
                title: 'Video Files',
                func: Register.videos
            }, {
                type: 'button',
                title: 'Torrent Files',
                func: Register.torrent
            }, {
                type: 'clear'
            }, {
                type: 'header',
                label: 'Trakt'
            }, {
                type: 'traktSettings'
            }],


            'Audio / Subs': [{
                type: 'header',
                label: 'Audio'
            }, {
                type: 'select',
                title: 'Audio Channel',
                tag: 'audioChannel',
                disabled: true,
                width: '110px',
                default: this.state.audioChannels[this.state.audioChannel]
            }, {
                type: 'select',
                title: 'Audio Tracks',
                tag: 'audioTrack',
                disabled: true,
                width: '160px',
                default: 'Track 1'
            }, {
                type: 'select',
                title: 'Audio Delay',
                tag: 'audioDelay',
                width: '86px',
                default: this.state.audioDelay + ' ms'
            }, {
                type: 'header',
                label: 'Subtitles'
            }, {
                type: 'toggle',
                title: 'Find Subtitles',
                tag: 'findSubs'
            }, {
                type: 'toggle',
                title: 'Auto-select Subtitle',
                tag: 'autoSub'
            }, {
                type: 'toggle',
                title: 'Flags in Menu',
                tag: 'menuFlags'
            }, {
                type: 'select',
                title: 'Subtitle Size',
                tag: 'subSize',
                width: '50px',
                default: this.state.customSubSize + '%'
            }, {
                type: 'select',
                title: 'Subtitle Delay',
                tag: 'subDelay',
                width: '86px',
                default: this.state.subDelay + ' ms'
            }, {
                type: 'select',
                title: 'Subtitle Color',
                tag: 'subColor',
                width: '60px',
                disabled: true,
                default: this.state.subColors[this.state.subColor]
            }, {
                type: 'select',
                title: 'Encoding',
                tag: 'subEncoding',
                width: '280px',
                disabled: true,
                default: this.state.subEncodings[this.state.encoding][0]
            }],


            'Torrents': [{
                type: 'header',
                label: 'Connections'
            }, {
                type: 'select',
                title: 'Maximum Peers',
                tag: 'peers',
                width: '86px',
                default: this.state.peers+''
            }, {
                type: 'select',
                title: 'Peer Port',
                tag: 'port',
                width: '86px',
                default: this.state.port
            }, {
                type: 'header',
                label: 'Downloading'
            }, {
                type: 'selectFolder',
                title: 'Download Folder',
                tag: 'download',
                default: this.state.downloadFolder,
                width: '280px'
            }, {
                type: 'select',
                title: 'Speed Pulsing',
                func: 'PulsingToggle',
                tag: 'pulse',
                width: '110px',
                default: this.state.speedPulsing,
                disabled: true
            }]
        };
        var indents = {
            'General': [],
            'Audio / Subs': [],
            'Torrents': []
        };
        var klm = 1000;
        var renderSettings = [];
        _.each(indents, (el, ij) => {
            renderObj[ij].forEach(el => {

                klm++;

                if (el.type == 'header') {

                    indents[ij].push(
                        <div className="setting-header" key={klm}>
                            {el.label}
                        </div>
                    );

                } else if (el.type == 'toggle') {

                    if (!el.func) el.func = 'Toggler';

                    indents[ij].push(
                        <Toggle
                            key={klm}
                            name={el.tag}
                            onToggle={(event, toggled) => this['_handle' + el.func](event, toggled, el.tag)}
                            defaultToggled={this.state[el.tag]}
                            label={el.title + ":"}
                            style={{marginBottom: '7px'}} />
                    );

                } else if (el.type == 'select') {

                    if (!el.func) el.func = el.tag.charAt(0).toUpperCase() + el.tag.slice(1);

                    if (el.disabled)

                        var newTextField = (
                            <TextField
                                disabled={true}
                                ref={el.tag + 'Input'}
                                defaultValue={el.default}
                                style={{float: 'right', height: '32px', width: el.width, top: '-5px', marginRight: '4px'}} />
                        );

                    else

                        var newTextField = (
                            <TextField
                                onKeyDown={this['_handle' + el.func + 'Keys']}
                                onBlur={this['_handle' + el.func + 'Blur']}
                                ref={el.tag + 'Input'}
                                defaultValue={el.default}
                                onChange={this.onChangeFunction}
                                style={{float: 'right', height: '32px', width: el.width, top: '-5px', marginRight: '4px'}} />
                        );

                    indents[ij].push(
                        <div key={klm}>
                            <div className="sub-delay-setting">
                                <span style={{color: '#fff'}}>
                                    {el.title + ':'}
                                </span>
                                <IconButton
                                    onClick={(event) => this['_handle' + el.func](event, -1)}
                                    iconClassName="material-icons"
                                    iconStyle={{color: '#0097a7', fontSize: '22px', float: 'right'}}>
                                    keyboard_arrow_down
                                </IconButton>
                                <IconButton
                                    onClick={(event) => this['_handle' + el.func](event, 1)}
                                    iconClassName="material-icons"
                                    iconStyle={{color: '#0097a7', fontSize: '22px', float: 'right'}}>
                                    keyboard_arrow_up
                                </IconButton>
                                {newTextField}
                            </div>
                            <div style={{clear: 'both'}} />
                        </div>
                    );

                } else if (el.type == 'selectFolder') {

                    if (!el.func) el.func = el.tag.charAt(0).toUpperCase() + el.tag.slice(1);

                    indents[ij].push(
                        <div key={klm}>
                            <div className="sub-delay-setting">
                                <span style={{color: '#fff'}}>
                                    {el.title + ':'}
                                </span>
                                <IconButton
                                    className={'clear-button'}
                                    onClick={this['_handleClear' + el.func]}
                                    iconClassName="material-icons"
                                    iconStyle={{color: '#0097a7', fontSize: '18px', float: 'right'}}>
                                    clear
                                </IconButton>
                                <TextField
                                    ref={el.tag + 'Input'}
                                    defaultValue={el.default}
                                    onFocus={this['_handle' + el.func + 'Focus']}
                                    style={{float: 'right', height: '32px', width: el.width, top: '-5px', marginRight: '4px'}}
                                    inputStyle={{cursor: 'pointer'}} />
                            </div>
                            <div style={{clear: 'both'}} />
                        </div>
                    );

                } else if (el.type == 'button') {

                    indents[ij].push(
                        <RaisedButton
                            key={klm}
                            style={{marginBottom: '15px', marginRight: '11px', float: 'left'}}
                            className='long-buttons'
                            onClick={el.func}
                            label={el.title} />
                    );

                } else if (el.type == 'clear') {

                    indents[ij].push(<div key={klm} style={{clear: 'both'}} />);

                } else if (el.type == 'traktSettings') {

                    indents[ij].push(
                        <div key={klm}>
                            <Toggle
                                name="trakt-scrobble"
                                onToggle={(event, toggled) => ls('traktScrobble', toggled)}
                                defaultToggled={this.state.traktScrobble}
                                style={{ 'display': (this.state.trakt ? 'block' : 'none') }}
                                label="Trakt Scrobble:"
                                style={{marginBottom: '7px'}} />
                            <RaisedButton className='long-buttons' onClick={this._openTraktLogin} label={ this.state.trakt ? 'Trakt Logout' : 'Trakt Login' } />
                        </div>
                    );

                }
            })

            renderSettings.push(
                <Tab key={klm + 1000} label={ij} style={{height: '100%', textTransform: 'none', padding: '14px 12px'}}>
                    <div className="playlist-inner" style={{maxWidth: '700px', maxHeight: 'calc(100% - 130px)'}}>
                        {indents[ij]}
                    </div>
                </Tab>
            );
        })
    }
});
