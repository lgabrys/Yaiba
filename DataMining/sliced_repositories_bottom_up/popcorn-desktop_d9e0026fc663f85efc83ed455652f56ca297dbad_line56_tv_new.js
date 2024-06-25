const Generic = require('./generic');
class TVApi extends Generic {
  detail(torrent_id, old_data, debug) {
    return this.contentOnLang(torrent_id, old_data.contextLocale);
  }
}
