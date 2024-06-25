






function engage(targetHistory) {
	targetHistory = typeof targetHistory !== 'undefined' ? targetHistory : 0;

	else asyncPlaylist.torDataBut = true;
	powGlobals.speedPiece = 0;
	powGlobals.speedUpdate = Math.floor(Date.now() / 1000);
	downSpeed = setTimeout(function(){ checkSpeed(); }, 3000);

	$("#headerText").text(powGlobals.engine.torrent.name);

	powGlobals.hash = powGlobals.engine.infoHash;
	powGlobals.downloaded = 0;

	powGlobals.hasVideo = 0;
	$("#filesList").html("");
	for (ij = 0; powGlobals.engine.files[ij]; ij++) {
		var fileStart = powGlobals.engine.files[ij].offset;
		if (powGlobals.engine.files[ij].offset > 0) fileStart++;
		var fileEnd = fileStart + powGlobals.engine.files[ij].length;
		powGlobals.indexes[ij] = ij;
		powGlobals.files[ij] = [];
		powGlobals.files[ij].firstPiece = Math.floor(fileStart / powGlobals.engine.torrent.pieceLength)
		powGlobals.files[ij].lastPiece = Math.floor((fileEnd -1) / powGlobals.engine.torrent.pieceLength)
		powGlobals.files[ij].lastDownload = 0;
		powGlobals.files[ij].downloaded = 0;
		powGlobals.files[ij].index = ij;
		powGlobals.files[ij].byteLength = powGlobals.engine.files[ij].length;
		powGlobals.files[ij].name = powGlobals.engine.files[ij].name;
	}

	if (getShortSzEp(powGlobals.files[0].name)) powGlobals.files = sortEpisodes(powGlobals.files,2);
	else powGlobals.files = naturalSort(powGlobals.files,2);

	if (!playerLoaded) asyncPlaylist.addPlaylist = [];
	var kj = 0;
	if (rememberPlaylist["0"]) {
		wjs().plugin.playlist.clear();
		if (waitForNext) waitForNext = false;
		if (isNaN(rememberPlaylist["0"].mrl) === true) {
			while (rememberPlaylist[kj.toString()] && isNaN(rememberPlaylist[kj.toString()].mrl) === true && rememberPlaylist[kj.toString()].mrl.toLowerCase().indexOf("pow://"+powGlobals.engine.infoHash.toLowerCase()) == -1) {
				if (rememberPlaylist[kj.toString()].contentType) {
					wjs().addPlaylist({
						 url: rememberPlaylist[kj.toString()].mrl,
						 title: rememberPlaylist[kj.toString()].title,
					});
				} else {
					wjs().addPlaylist({
						 url: rememberPlaylist[kj.toString()].mrl,
					});
				}
				powGlobals.videos[kj] = {};
				powGlobals.videos[kj].path = "unknown";
				powGlobals.videos[kj].filename = "unknown";
				kj++;
			}
		}
	}
	powGlobals.files.forEach(function(el,ij) {
		var thisName = el.name;
		if (supportedVideo.indexOf(thisName.split('.').pop().toLowerCase()) > -1) {
			if (thisName.toLowerCase().replace("sample","") == thisName.toLowerCase() && thisName != "ETRG.mp4") {
				if (thisName.toLowerCase().substr(0,5) != "rarbg") {
					powGlobals.hasVideo++;
					if (typeof savedIj === 'undefined') savedIj = ij;
					powGlobals.videos[kj] = [];
					powGlobals.videos[kj].checkHashes = [];
					powGlobals.videos[kj].lastSent = 0;
					powGlobals.videos[kj].index = el.index;
					powGlobals.videos[kj].filename = thisName.split('/').pop().replace(/\{|\}/g, '');
					var fileStart = powGlobals.engine.files[el.index].offset;
					var fileEnd = powGlobals.engine.files[el.index].offset + powGlobals.engine.files[el.index].length;
					powGlobals.videos[kj].firstPiece = Math.floor(fileStart / powGlobals.engine.torrent.pieceLength);
					powGlobals.videos[kj].lastPiece = Math.floor((fileEnd -1) / powGlobals.engine.torrent.pieceLength);
					powGlobals.videos[kj].path = "" + powGlobals.engine.path + "\\" + powGlobals.engine.files[el.index].path;
					powGlobals.videos[kj].byteLength = powGlobals.engine.files[el.index].length;
					powGlobals.videos[kj].downloaded = 0;
					if (powGlobals.hasVideo == 1) {
						var filename = thisName.split('/').pop().replace(/\{|\}/g, '')
						powGlobals.filename = filename;
						powGlobals.path = powGlobals.videos[kj].path;
						powGlobals.firstPiece = powGlobals.videos[kj].firstPiece;
						powGlobals.lastPiece = powGlobals.videos[kj].lastPiece;
						if (powGlobals.videos[kj].byteLength) powGlobals.byteLength = powGlobals.videos[kj].byteLength;
						else asyncPlaylist.preBufZero = true;
						if (powGlobals.engine.files[el.index].offset != powGlobals.engine.server.index.offset) {
							for (as = 0; powGlobals.engine.files[powGlobals.files[as].index]; as++) {
								if (powGlobals.engine.files[powGlobals.files[as].index].offset == powGlobals.engine.server.index.offset) {
									break;
								}
							}
						}

					}
					if (targetHistory == 0) {
						if (playerLoaded) {
							wjs().addPlaylist({
							});
						} else {
							asyncPlaylist.addPlaylist.push({
								 contentType: require('mime-types').lookup(powGlobals.engine.files[el.index].path)
							});
						}
					}
					kj++;
				}
			}
		}
	});
	if (rememberPlaylist[kj.toString()]) {
		if (isNaN(rememberPlaylist[kj.toString()].mrl) === true) {
			while (rememberPlaylist[kj.toString()]) {
				if (rememberPlaylist[kj.toString()].contentType) {
					wjs().addPlaylist({
						 title: rememberPlaylist[kj.toString()].title,
					});
				} else {
					wjs().addPlaylist({
					});
				}
				powGlobals.videos[kj] = {};
				powGlobals.videos[kj].path = "unknown";
				powGlobals.videos[kj].filename = "unknown";
				kj++;
			}
		}
	}
	if (targetHistory != 0) {
		for (oi = 0; targetHistory.playlist[oi.toString()]; oi++) {
			if (targetHistory.playlist[oi.toString()].mrl || targetHistory.playlist[oi.toString()].mrl == 0) if (targetHistory.playlist[oi.toString()].title) {
				if (!isNaN(targetHistory.playlist[oi.toString()].mrl)) {
					if (targetHistory.playlist[oi.toString()].contentType) {
					} else {
						wjs().addPlaylist({
						});
					}
				} else {
					} else {
					}
				}
			}
		}
	}
	setTimeout(function() { powGlobals.engine.discover(); powGlobals.engine.swarm.reconnectAll(); },1000);
}
