const Generic = require('./generic');
class TVApi extends Generic {
  constructor(args) {
    super(args);
    if (args.apiURL) this.apiURL = args.apiURL.split(',');
    this.language = args.language;
  }
  fetch(filters) {
    const params = {
      sort: 'seeds',
      limit: '50'
    };
    if (filters.keywords) {
      params.keywords = this.apiURL[0].includes('popcorn-ru') ? filters.keywords.replace(/\s/g, '% ') : filters.keywords.replace(/[^a-zA-Z0-9]|\s/g, '% ');
    }
  }
}
