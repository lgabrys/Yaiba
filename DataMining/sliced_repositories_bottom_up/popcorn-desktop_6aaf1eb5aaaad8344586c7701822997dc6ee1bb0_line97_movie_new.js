const Generic = require('./generic');
class MovieApi extends Generic {
  constructor(args) {
    super(args);
    if (args.apiURL) {
      this.apiURL = args.apiURL.split(',');
    }
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
