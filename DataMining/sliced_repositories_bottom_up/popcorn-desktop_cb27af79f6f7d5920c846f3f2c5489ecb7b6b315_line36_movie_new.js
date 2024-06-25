const Generic = require('./generic');
class MovieApi extends Generic {
  constructor(args) {
    super(args);
    this.language = args.language || 'en';
    this.contentLanguage = args.contentLanguage || this.language;
  }
  _formatForPopcorn(movies) {
    const results = [];
    movies.forEach(movie => {
      if (movie.torrents) {
        results.push({
          type: 'movie',
          imdb_id: movie.imdb_id,
          title: movie.title,
          year: movie.year,
          genre: movie.genres,
          rating: parseInt(movie.rating.percentage, 10) / 10,
          runtime: movie.runtime,
          images: movie.images,
          image: movie.images ? movie.images.poster : false,
          cover: movie.images ? movie.images.poster : false,
          backdrop: movie.images ? movie.images.fanart : false,
          poster: movie.images ? movie.images.poster : false,
          synopsis: movie.synopsis,
          trailer: movie.trailer !== null ? movie.trailer : false,
          certification: movie.certification,
          torrents:
            movie.torrents[this.contentLanguage]
              ? movie.torrents[this.contentLanguage]
              : movie.torrents[Object.keys(movie.torrents)[0]],
          langs: movie.torrents,
          locale: movie.locale || null,
        });
      }
    });
  }
}
