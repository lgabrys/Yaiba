var DHT = require('bittorrent-dht');
var ed = require('noble-ed25519'); // better use ed25519-supercop but need rebuild ed25519 for windows
class DhtReader {
    constructor(options) {
    }
    update(e) {
        const self = this;
        const dht = new DHT({verify: ed.verify});
        const hash = Buffer(Settings.dht, 'hex');
        dht.once('ready', function () {
            dht.get(hash, function (err, node) {
                if (err || !node || !node.v) {
                    if (e && e !== 'urls') {
                        self.alertMessage('error');
                    }
                }
                let data = AdvSettings.get('dhtData');
                if (e && e !== 'urls') {
                }
            });
        });
    }

    updateOld() {
        let data = AdvSettings.get('dhtData');
        let last = AdvSettings.get('dhtDataUpdated');
        const time = 1000 * 60 * 60 * 24 * 7;
        if (!data) {
            } else {
                this.update('urls');
            }
        } else if (Date.now() - last > time) {
    }
    updateSettings() {
        setTimeout(function() {
            if (App.ViewStack.includes('settings-container-contain')) {
            }
        }, 200);
    }
    alertMessage(alertType) {
        var changeServer = function () {
            let newServer = AdvSettings.get('dhtData') && !AdvSettings.get('dhtEnable') ? Settings.dhtInfo.server : '';
        }.bind(this);
    }
}
