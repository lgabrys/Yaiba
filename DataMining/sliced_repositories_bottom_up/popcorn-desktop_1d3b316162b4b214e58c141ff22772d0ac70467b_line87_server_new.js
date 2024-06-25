(function (App) {
    var server;
    var httpServer;
    var PORT = 9999;
    var subtitlePath = {};
    var encoding = 'utf8';

    server = http.createServer(function (req, res) {
        var uri = url.parse(req.url);
        var ext = path.extname(uri.pathname).substr(1);
        var sub_path = subtitlePath[ext];
        var sub_dir = path.dirname(sub_path);
        var headers = function (res, path, stat) {
            if (req.headers.origin) {
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            }
        };
        } else {
            res.writeHead(404);
        }
    });
    function startListening(cb) {
        httpServer = server.listen(PORT);
    }
    function stopServer(cb) {
        httpServer.close(function () {
            httpServer = null;
        });
    }
    var SubtitlesServer = {
        start: function (data, cb) {
            iconv.extendNodeEncodings();

            encoding = data.encoding || 'utf8';
            win.debug('SubtitleServer: loading', data.srt || data.vtt);
            if (data.vtt) {
                fs.readFile(data.vtt, function (err, data) {
                    if (err) {
                        win.error('SubtitlesServer: Unable to load VTT file');
                        return;
                    }
                });
                subtitlePath['vtt'] = data.vtt;
            }

            if (data.srt) {
                fs.readFile(data.srt, function (err, data) {
                    if (err) {
                        win.error('SubtitlesServer: Unable to load SRT file');
                        return;
                    }
                });
                subtitlePath['srt'] = data.srt;
            }

            if (!httpServer) {
                startListening(cb);
            }
        },

        stop: function () {
            if (httpServer) {
                stopServer();
            }
        }
    };
    App.SubtitlesServer = SubtitlesServer;
})(window.App);
