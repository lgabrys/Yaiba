class DhtReader {
    update(e) {
        const self = this;
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
        if (!data) {
            } else {
                this.update('urls');
            }
        } else if (Date.now() - last > time) {
    }
    updateSettings() {
    }
    alertMessage(alertType) {
        var changeServer = function () {
            let newServer = AdvSettings.get('dhtData') && !AdvSettings.get('dhtEnable') ? AdvSettings.get('dhtData').split('server":"')[1].split('","git":"')[0] : '';
        }.bind(this);
    }
}
