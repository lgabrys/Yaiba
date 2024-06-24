import Alt from 'alt';
export default new Alt();
import alt from '../../alt'
import _ from 'lodash';
import ls from 'local-storage';
class PlayerActions {
    constructor() {
        this.generateActions(

        );
    }
    onParseURL(qTask) {
        if (!this.urlParserQueue) {
            var player = this;
            var parserQueue = async.queue((task, cb) => {
                if (task.url && !task.filename) {
                    var client = new MetaInspector(task.url, {
                    });
                    client.on("fetch", function() {
                        var idx = task.idx;
                        if (!(itemDesc && itemDesc.mrl == task.url)) {
                            for (var i = 1; i < player.wcjs.playlist.items.count; i++) {
                                if (player.itemDesc(i).mrl == task.url) {
                                    idx = i;
                                }
                            }
                        }
                        if (idx > -1 && client.image && client.title) {
                            if (document.getElementById('item' + idx)) {
                                document.getElementById('item' + idx).style.background = "url('" + client.image + "')";
                                document.getElementById('itemTitle' + idx).innerHTML = client.title;
                            }
                        }
                    });

                } else if (task.filename) {
                    var parsedFilename = parseVideo(task.filename);
                    if (!parsedFilename.season && !task.secondTry && parser(task.filename).shortSzEp()) {
                        parsedFilename.type = 'series';
                        parsedFilename.season = parser(task.filename).season();
                        parsedFilename.episode = [parser(task.filename).episode()];
                        parsedFilename.name = parser(task.filename).showName();
                    }
                    nameToImdb(parsedFilename, function(err, res, inf) {
                        if (res) {
                            parsedFilename.imdb = res;
                            parsedFilename.extended = 'full,images';
                            if (parsedFilename.type == 'movie') {
                                var buildQuery = {
                                    id: parsedFilename.imdb,
                                    id_type: 'imdb',
                                    extended: parsedFilename.extended
                                };
                                var summary = traktUtil.movieInfo;
                            } else if (parsedFilename.type == 'series') {
                                var buildQuery = {
                                    id: parsedFilename.imdb,
                                    id_type: 'imdb',
                                    season: parsedFilename.season,
                                    episode: parsedFilename.episode[0],
                                    extended: parsedFilename.extended
                                };
                                var summary = traktUtil.episodeInfo;
                            }
                            summary(buildQuery).then(results => {

                                var idx = task.idx;

                                var itemDesc = player.itemDesc(task.idx);

                                if (!(itemDesc && itemDesc.mrl == task.url)) {

                                    for (var i = 1; i < player.wcjs.playlist.items.count; i++) {
                                        if (player.itemDesc(i).mrl.endsWith(task.url)) {
                                            idx = i;
                                            break;
                                        }
                                    }

                                }

                                if (idx > -1 && results && results.title) {

                                    var newObj = {
                                        idx: idx
                                    };

                                    // this is the episode title for series
                                    newObj.title = parsedFilename.name.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

                                    if (results.season && results.number) {
                                        newObj.title += ' S' + ('0' + results.season).slice(-2) + 'E' + ('0' + results.number).slice(-2);
                                    } else if (results.year) {
                                        newObj.title += ' ' + results.year;
                                    }

                                    if (results.images) {
                                        if (results.images.screenshot && results.images.screenshot.thumb) {
                                            newObj.image = results.images.screenshot.thumb;
                                        } else if (results.images.fanart && results.images.fanart.thumb) {
                                            newObj.image = results.images.fanart.thumb;
                                        }
                                    }

                                    if (document.getElementById('item' + idx)) {
                                        if (newObj.image)
                                            document.getElementById('item' + idx).style.background = "url('" + newObj.image + "')";

                                        if (newObj.title)
                                            document.getElementById('itemTitle' + idx).innerHTML = newObj.title;
                                    }

                                    newObj.parsed = parsedFilename;
                                    newObj.trakt = results;

                                    playerActions.setDesc(newObj);
                                    if (idx == player.wcjs.playlist.currentItem) {
                                        player.setState({
                                            title: newObj.title
                                        });
                                        if (!player.foundTrakt) {
                                            player.setState({
                                                foundTrakt: true
                                            });

                                            var shouldScrobble = traktUtil.loggedIn && ls.isSet('traktScrobble');
                                            if (shouldScrobble) {
                                                if (!ls.isSet('playerNotifs') || ls('playerNotifs'))
                                                    player.notifier.info('Scrobbling', '', 6000);
                                                traktUtil.scrobble('start', player.wcjs.position, results);
                                            }
                                        }
                                    }

                                    _.delay(() => {
                                        cb()
                                    }, 500)

                                }
                            }).catch(err => {
                        }
                    })
                }
            }, 1);
        }
    }
}
