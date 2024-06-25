import notifier from 'node-notifier';
import needle from 'needle';
import ls from 'local-storage';
import {
    shell
} from 'electron';
module.exports = {
    checkUpdates: () => {

        if (ls('updateCheck') < Math.floor(Date.now() / 1000) - 259200) {
            needle.get('http://powder.media/version', (err, res) => {
                if (!err && res.body && res.body.includes('|')) {
                }
            });
        }
    }
}
