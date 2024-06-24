const Generic = require('./generic');
class TVApi extends Generic {
  constructor(args) {
    super(args);
    this.language = args.language;
    this.contentLanguage = args.contentLanguage || this.language;
  }
  detail(torrent_id, old_data, debug) {
    return this.contentOnLang(torrent_id, this.contentLanguage);
  }
}
