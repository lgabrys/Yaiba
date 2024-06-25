'use strict';
const TVApi = require('./tv');
class AnimeApi extends TVApi {
  fetch(filters) {
    const params = {
      sort: 'seeds',
      limit: '50',
      anime: 1
    };
    params.locale = this.language;
    params.contentLocale = this.contentLanguage;
    if (!this.contentLangOnly) {
      params.showAll = 1;
    }
    if (filters.keywords) {
      params.keywords = filters.keywords.trim();
    }
    if (filters.order) {
      params.order = filters.order;
    }
    if (filters.sorter && filters.sorter !== 'popularity') {
      params.sort = filters.sorter;
    }
    const uri = `shows/${filters.page}?` + new URLSearchParams(params);
    return this._get(0, uri).then(data => {
      data.forEach(entry => (entry.type = 'show'));
    });
  }
}
