var Settings = {
  projectName: 'Popcorn Time',
  projectUrl: 'https://popcorntime.app',
  projectTwitter: 'popcorntimetv',
  projectTwitter2: 'r_popcorntime',
  projectBlog: 'https://blog.popcorntime.app/',
  projectForum: 'https://www.reddit.com/r/PopcornTime',
  projectForum2: 'https://discuss.popcorntime.app',

  statusUrl: 'http://status.popcorntime.app',
  changelogUrl: 'https://github.com/popcorn-official/popcorn-desktop/commits/master',
  issuesUrl: 'https://github.com/popcorn-official/popcorn-desktop/issues',
  sourceUrl: 'https://github.com/popcorn-official/popcorn-desktop/',
  commitUrl: 'https://github.com/popcorn-official/popcorn-desktop/commit',
  updateKey:
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBtjCCASsGByqGSM44BAEwggEeAoGBAPNM5SX+yR8MJNrX9uCQIiy0t3IsyNHs\n' +
    'HWA180wDDd3S+DzQgIzDXBqlYVmcovclX+1wafshVDw3xFTJGuKuva7JS3yKnjds\n' +
    'NXbvM9CrJ2Jngfd0yQPmSh41qmJXHHSwZfPZBxQnspKjbcC5qypM5DqX9oDSJm2l\n' +
    'fM/weiUGnIf7AhUAgokTdF7G0USfpkUUOaBOmzx2RRkCgYAyy5WJDESLoU8vHbQc\n' +
    'rAMnPZrImUwjFD6Pa3CxhkZrulsAOUb/gmc7B0K9I6p+UlJoAvVPXOBMVG/MYeBJ\n' +
    '19/BH5UNeI1sGT5/Kg2k2rHVpuqzcvlS/qctIENgCNMo49l3LrkHbJPXKJ6bf+T2\n' +
    '8lFWRP2kVlrx/cHdqSi6aHoGTAOBhAACgYBTNeXBHbWDOxzSJcD6q4UDGTnHaHHP\n' +
    'JgeCrPkH6GBa9azUsZ+3MA98b46yhWO2QuRwmFQwPiME+Brim3tHlSuXbL1e5qKf\n' +
    'GOm3OxA3zKXG4cjy6TyEKajYlT45Q+tgt1L1HuGAJjWFRSA0PP9ctC6nH+2N3HmW\n' +
    'RTcms0CPio56gg==\n' +
    '-----END PUBLIC KEY-----\n',
  opensubtitles: {
    useragent: 'Butter'
  },
  trakttv: {
    client_id:
      '647c69e4ed1ad13393bf6edd9d8f9fb6fe9faf405b44320a6b71ab960b4540a2',
    client_secret:
      'f55b0a53c63af683588b47f6de94226b7572a6f83f40bd44c58a7c83fe1f2cb1'
  },
  tvshowtime: {
    client_id: 'iM2Vxlwr93imH7nwrTEZ',
    client_secret: 'ghmK6ueMJjQLHBwsaao1tw3HUF7JVp_GQTwDwhCn'
  },
  fanart: {
    api_key: 'ce4bba4b3cc473306c6cddb4e1cb0da4'
  },
  tvdb: {
    api_key: '80A769280C71D83B'
  },
  tmdb: {
    api_key: 'ac92176abc89a80e6f5df9510e326601'
  }
};
Settings.providers = {
  movie: {
    order: 1,
    name: 'Movies',
    uri: [
      'archive'
      //'stremio?auth={"url":"http://api8.herokuapp.com","key":"423f59935153f2f5d2db0f6c9b812592b61b3737"}&url=http://localhost:9005'
    ]
  },
  tvshow: {
    order: 2,
    name: 'Series',
    uri: [
      'ccc',
      'youtube?channel=HolaSoyGerman',
      'youtube?channel=JulianSerrano7',
      'youtube?channel=LasCronicasDeAlfredo',
      'youtube?channel=maritobaracus',
      'youtube?channel=petercapusottotv&titleRegex=[0-9]+[aª] +Temporada',
      'youtube?channel=sincodificar2',
      'youtube?channel=lady16makeup',
      'youtube?channel=werevertumorro',
      'youtube?channel=DrossRotzank',
      'youtube?channel=DeiGamer',
      'youtube?channel=ReinoMariaElenaWalsh',
      'youtube?channel=LucasCastelvlogs',
      'youtube?channel=thedevilwearsvitton',
      'youtube?channel=elbananeropuntocom'
    ]
  },
  subtitle: 'OpenSubtitles',
  metadata: 'Trakttv',
  tvst: 'TVShowTime',

  torrentCache: 'TorrentCache'
};
Settings.trackers = {
  blacklisted: ['demonii'],
  forced: [
    'udp://glotorrents.pw:6969',
    'udp://tracker.opentrackr.org:1337',
    'udp://torrent.gresille.org:80',
    'udp://tracker.openbittorrent.com:1337',
    'udp://tracker.coppersurfer.tk:6969',
    'udp://tracker.leechers-paradise.org:6969',
    'udp://p4p.arenabg.ch:1337',
    'udp://p4p.arenabg.com:1337',
    'udp://tracker.internetwarriors.net:1337',
    'udp://9.rarbg.to:2710',
    'udp://9.rarbg.me:2710',
    'udp://exodus.desync.com:6969',
    'udp://tracker.cyberia.is:6969',
    'udp://tracker.torrent.eu.org:451',
    'udp://tracker.open-internet.nl:6969',
    'wss://tracker.openwebtorrent.com',
    'wss://tracker.btorrent.xyz'
  ]
};
Settings.apiServer = '';
Settings.proxyServer = '';
Settings.language = '';
Settings.defaultOsWindowFrame = false;
