const Generic = require('./generic');
class MovieApi extends Generic {
  fetch(filters) {
    const params = {
      sort: 'seeds',
      limit: '50'
    };
    if (filters.keywords) {
      params.keywords = filters.keywords.replace(/\s/g, '% ');
    }
  }
}
