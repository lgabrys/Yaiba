import Alt from 'alt';
export default new Alt();
import alt from '../../alt';
class playerStore {
    constructor() {
        this.wcjs = false;
        this.length = 0;
    }
    onScrobble(time) {

        time = parseInt(time);
        if (time < 0) time = 0;
        else if (this.length && time > this.length) time = this.length - 2000;
        this.wcjs.time = time;
    }
    onError() {
        this.wcjs.stop();
    }
}
