/*****************************************************************************
* Copyright (c) 2015 Branza Victor-Alexandru <branza.alex[at]gmail.com>
*
* This program is free software; you can redistribute it and/or modify it
* under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation; either version 2.1 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with this program; if not, write to the Free Software Foundation,
* Inc., 51 Franklin Street, Fifth Floor, Boston MA 02110-1301, USA.
*****************************************************************************/









localStorage.powderVersion = "0.17";
if (typeof localStorage.maxPeers === 'undefined') localStorage.maxPeers = 200;
if (typeof localStorage.tmpDir === 'undefined') localStorage.tmpDir = 'Temp';
if (typeof localStorage.libDir === 'undefined') localStorage.libDir = 'Temp';
if (typeof localStorage.clickPause === 'undefined') localStorage.clickPause = 'both';
$("#max-peers").text(localStorage.maxPeers);
if (localStorage.libDir == "Temp") {
} else $("#lib-folder").text(localStorage.libDir);
if (localStorage.clickPause == 'fullscreen') {
	$("#click-pause").text("only in Fullscreen");
} else $("#click-pause").text("Fullscreen + Windowed");
function alphanumCase(a, b) {
  function chunkify(t) {
    var tz = new Array();
    var x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
  }

  var aa = chunkify(a.toLowerCase());
  var bb = chunkify(b.toLowerCase());

  for (x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
      } else return (aa[x] > bb[x]) ? 1 : -1;
    }
  }
}
// end natural sort order function for playlist
function regTorrent() {
	fs.writeFile(gui.App.dataPath+'\\register-torrent.reg', 'REGEDIT4\r\n[HKEY_CURRENT_USER\\Software\\Classes\\powder.player.v1\\DefaultIcon]\r\n@="'+process.execPath.split("\\").join("\\\\")+'"\r\n[HKEY_CURRENT_USER\\Software\\Classes\\powder.player.v1\\shell\\open\\command]\r\n@="\\"'+process.execPath.split("\\").join("\\\\")+'\\" \\"%1\\""\r\n[HKEY_CURRENT_USER\\Software\\Classes\\.torrent]\r\n@="powder.player.v1"\r\n"Content Type"="application/x-bittorrent"', function (err) {
        if (err) throw err;
    });
}

function regVideos() {
}
function regMagnet() {
	fs.writeFile(gui.App.dataPath+'\\register-magnet.reg', 'REGEDIT4\r\n[HKEY_CLASSES_ROOT\\Magnet]\r\n@="URL:magnet Protocol"\r\n"Content Type"="application/x-magnet"\r\n"URL Protocol"=""\r\n\[HKEY_CLASSES_ROOT\\Magnet\\DefaultIcon]\r\n@="\\"'+process.execPath.split("\\").join("\\\\")+'\\"\r\n[HKEY_CLASSES_ROOT\\Magnet\\shell]\r\n[HKEY_CLASSES_ROOT\\Magnet\\shell\\open]\r\n[HKEY_CLASSES_ROOT\\Magnet\\shell\\open\\command]\r\n@="\\"'+process.execPath.split("\\").join("\\\\")+'\\" \\"%1\\""\r\n[HKEY_CURRENT_USER\\Software\\Classes\\Magnet]\r\n@="URL:magnet Protocol"\r\n"Content Type"="application/x-magnet"\r\n"URL Protocol"=""\r\n[HKEY_CURRENT_USER\\Software\\Classes\\Magnet\\DefaultIcon]\r\n@="\\"'+process.execPath.split("\\").join("\\\\")+'\\"\r\n[HKEY_CURRENT_USER\\Software\\Classes\\Magnet\\shell]\r\n[HKEY_CURRENT_USER\\Software\\Classes\\Magnet\\shell\\open]\r\n[HKEY_CURRENT_USER\\Software\\Classes\\Magnet\\shell\\open\\command]\r\n@="\\"'+process.execPath.split("\\").join("\\\\")+'\\" \\"%1\\""', function (err) {
    });
}
function changeClickPause() {
	if (localStorage.clickPause == 'fullscreen') {
		localStorage.clickPause = "both";
	} else {
		localStorage.clickPause = "fullscreen";
	}
}

function openPeerSelector() {
}

$('#max-peers-hov').hover(function() { }, function() {
	if ($('.ui-spinner').is(":hover") === false) if ($('.ui-spinner').is(':visible')) $('.ui-spinner').hide(0,function() {
		localStorage.maxPeers = parseInt($('#spinner').val());
	})
});
var isReady = 0;
var gui = require('nw.gui');
gui.Screen.Init();

var win = gui.Window.get();

win.zoomLevel = -1;
$('#open-url').css('top', Math.round(($(window).height() - 187) / 2)+'px');

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
$(window).resize(function() {
	if ($('#main').css("display") == "table") {
		if ($(window).height() < $("#main").height() && win.zoomLevel == 0) {
			if (win.zoomLevel > -1) win.zoomLevel = -1;
		} else if ($(window).width() < $("#main").width() && win.zoomLevel == 0) {
			if (win.zoomLevel > -1) win.zoomLevel = -1;
		} else if ($(window).width() > 730 && $(window).height() > 650 && win.zoomLevel == -1) {
			if (win.zoomLevel < 0) win.zoomLevel = 0;
		}
	} else {
		if (win.zoomLevel != 0) win.zoomLevel = 0;
	}
});
$(function() {
	$('.easy-modal').easyModal({
		top: 200,
	});
	$('.easy-modal-open').click(function(e) {
	});
	$('.easy-modal-animated').easyModal({
		overlay: 0.2,
	});
	$('.second-easy-modal-animated').easyModal({
		overlay: 0.2,
		transitionIn: 'animated bounceInLeft',
	});
	$('.third-easy-modal-animated').easyModal({
		transitionOut: 'animated bounceOutRight',
		closeButtonClass: '.third-animated-close'
	});
	$('.forth-easy-modal-animated').easyModal({
	});
});
function checkInternet(cb) {
	require('dns').lookup('google.com',function(err) {
	})
}
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };
function runMultiple(fileArray) {
  // if multiple files dropped and one is a torrent, only add the torrent
  // end only 1 torrent limit

  setOnlyFirst = 2;
	// playlist natural order
	if (fileArray.length > 1) {
		perfect = false;
		while (!perfect) {
			perfect = true;
			for (ij = 0; typeof fileArray[ij] !== 'undefined'; ij++) {
				if (typeof fileArray[ij+1] !== 'undefined') {
					if (difference > 0) {
						perfect = false;
						tempHold = fileArray[ij];
						fileArray[ij] = fileArray[ij+1];
						fileArray[ij+1] = tempHold;
					}
				}
			}
		}
	}
  for (ij = 0; typeof fileArray[ij] !== 'undefined'; ij++) runURL(fileArray[ij]);
  powGlobals.videos = [];
  for (ij = 0; typeof fileArray[ij] !== 'undefined'; ij++) {
	powGlobals.videos[ij] = [];
	powGlobals.videos[ij].filename = fileArray[ij].split('\\').pop();
	powGlobals.videos[ij].path = fileArray[ij];
  }
  setOnlyFirst = 0;

}
var powGlobals = [];
var setOnlyFirst = 0;
var fs = require('fs');
var probe = require('node-ffprobe');
var peerflix = require('peerflix');
var opensubtitles = require('opensubtitles-client');
var OS = require("opensubtitles-api");
var os = new OS();
var firstTimeEver = 1;
var doSubsLocal = 0;
var walk = function(dir, done) {
  fs.readdir(dir, function(err, list) {
    (function next() {
      fs.stat(file, function(err, stat) {
        } else {
		  if (supportedVideo.indexOf(file.split('.').pop().toLowerCase()) > -1) {
			  if (getShowName(powGlobals.videos[powGlobals.videos.length - 1].filename) == getShowName(file.split('/').pop())) {
				  if (alphanumCase(cleanName(getName(file.split('/').pop())),cleanName(getName(powGlobals.videos[powGlobals.videos.length - 1].filename))) >0) {
					  results.push(file);
				  }
			  }
		  }
        }
      });
    })();
  });
};
function cleanName(filename) {
}
function getShowName(filename) {
	findParts = cleanName(getName(filename)).split(" ");
	for (ik = 0; typeof findParts[ik] !== 'undefined'; ik++) {
	}
}
function getShortSzEp(filename) {
	findParts = cleanName(getName(filename)).split(" ");
	for (ik = 0; typeof findParts[ik] !== 'undefined'; ik++) {
	}
	return false;
}
function matchSeasons(filenameOne,filenameTwo) {
	findParts = cleanName(getName(filenameOne)).split(" ");
	for (ik = 0; typeof findParts[ik] !== 'undefined'; ik++) {
		if (isNaN(findParts[ik].replace("s","").replace("e","")) === false && findParts[ik].replace("s","").replace("e","").length == 4) {
			firstSeason = parseInt(findParts[ik].split("e")[0].replace("s",""));
		} else if (isNaN(findParts[ik].replace("s","").replace("e","").replace("-","").replace("e","")) === false && findParts[ik].replace("s","").replace("e","").replace("-","").replace("e","").length == 6) {
			firstSeason = parseInt(findParts[ik].split("e")[0].replace("s",""));
		}
	}
	findParts = cleanName(getName(filenameTwo)).split(" ");
	for (ik = 0; typeof findParts[ik] !== 'undefined'; ik++) {
	}
}
function scanLibrary() {
	if (localStorage.libDir == 'Temp') {
		if (localStorage.tmpDir != 'Temp') {
			libDir = localStorage.tmpDir;
		} else if (typeof powGlobals.engine !== 'undefined') {
			libDir = powGlobals.engine.path;
		}
	} else libDir = localStorage.libDir;
	if (typeof libDir !== 'undefined') walk(libDir, function(err, results) {
	  cleanArray = [];
	  results = cleanArray;
		if (results.length > 1) {
			perfect = false;
			while (!perfect) {
				perfect = true;
				for (ij = 0; typeof results[ij] !== 'undefined'; ij++) {
					if (typeof results[ij+1] !== 'undefined') {
						if (difference > 0) {
							perfect = false;
							tempHold = results[ij];
							results[ij] = results[ij+1];
							results[ij+1] = tempHold;
						}
					}
				}
			}
			perfect = false;
			while (!perfect) {
				perfect = true;
				for (ij = 0; typeof results[ij] !== 'undefined'; ij++) {
					if (typeof results[ij+1] !== 'undefined') {
						if (difference > 0) {
							perfect = false;
							tempHold = results[ij];
							results[ij] = results[ij+1];
							results[ij+1] = tempHold;
						}
					}
				}
			}
		}
	  for (ij = 0; typeof results[ij] !== 'undefined'; ij++) {
		    newVideoId = powGlobals.videos.length;
			powGlobals.videos[newVideoId] = [];
		    powGlobals.videos[newVideoId].filename = results[ij].split('/').pop();
		    powGlobals.videos[newVideoId].path = results[ij].split('/').join('\\');
			powGlobals.videos[newVideoId].byteLength = fs.statSync(results[ij].split('/').join('\\')).size;
			powGlobals.videos[newVideoId].local = 1;
			if (ij == 0) {
			} else {
			}
	  }
	});
}
function resizeInBounds(newWidth,newHeight) {
	for(var i = 0; i < gui.Screen.screens.length; i++) {
		var screen = gui.Screen.screens[i];
		var inTheScreen = 0;
		if (parseInt(win.x) > parseInt(screen.bounds.x) && parseInt(win.x) < (parseInt(screen.bounds.x) + parseInt(screen.work_area.width))) {
			inTheScreen = 1;
		} else if (i == 0 && parseInt(win.x) <= parseInt(screen.bounds.x)) inTheScreen = 1;
		if (inTheScreen) {
			} else {
				} else {
					} else {
						if ((parseInt(win.y) + parseInt(newHeight)) > parseInt(screen.work_area.height)) {
							if (parseInt(win.x) < 0) {
							} else {
							}
						} else if (parseInt(win.y) < 0) {
					}
				}
			}
		}
	}
}
function isPlaying() {
	if (doSubsLocal == 1 && typeof powGlobals.engine === 'undefined') {
		wjs().setDownloaded(0.0000000000000000001);
		doSubsLocal = 0;
		getLength();
	}
	if (firstTime == 0) {
		if (firstTimeEver == 1) {
			setTimeout(function() { wjs().onVolume(function() { if (this.volume() > 0) localStorage.savedVolume = this.volume(); }); },101);
		}
		if (firstTimeEver == 1 && wjs().fullscreen() === false) {
			firstTimeEver = 0;
		}
	}
}
function isOpening() {
	if (powGlobals.currentIndex != wjs().currentItem()) {
		delete powGlobals.duration;
		delete powGlobals.fileHash;
		powGlobals.currentIndex = wjs().currentItem();
		if (typeof powGlobals.engine !== 'undefined') {
			wjs().setOpeningText("Prebuffering 0%");
			if (typeof powGlobals.videos[wjs().currentItem()] !== 'undefined' && typeof powGlobals.videos[wjs().currentItem()].local === 'undefined') {
				for (gh = 0; typeof powGlobals.files[gh] !== 'undefined'; gh++) if (powGlobals.files[gh].index == powGlobals.videos[wjs().currentItem()].index) break;
				playEl(gh);
			}
			win.title = getName(powGlobals.videos[wjs().currentItem()].filename);
			wjs().setDownloaded(0);

			powGlobals.filename = powGlobals.videos[wjs().currentItem()].filename;
			powGlobals.path = powGlobals.videos[wjs().currentItem()].path;
			if (typeof powGlobals.videos[wjs().currentItem()].byteLength !== 'undefined') {
				powGlobals.byteLength = powGlobals.videos[wjs().currentItem()].byteLength;
			} else {
				if (typeof powGlobals.byteLength !== 'undefined') delete powGlobals.byteLength;
			}
			if (typeof powGlobals.videos[wjs().currentItem()].local === 'undefined') {
				powGlobals.firstPiece = powGlobals.videos[wjs().currentItem()].firstPiece;
				powGlobals.lastPiece = powGlobals.videos[wjs().currentItem()].lastPiece;
			}
			firstTime = 0;

			checkInternet(function(isConnected) {
				if (isConnected && typeof powGlobals.byteLength !== 'undefined') $.ajax({ type: 'GET', url: window.atob("aHR0cDovL3Bvd2Rlci5tZWRpYS9tZXRhRGF0YS9nZXQucGhwP2Y9")+encodeURIComponent(powGlobals.filename)+window.atob("Jmg9")+encodeURIComponent(powGlobals.hash)+window.atob("JnM9")+encodeURIComponent(powGlobals.byteLength), global: false, cache: false, success: readData });
			});
		} else {
			wjs().setOpeningText("Prebuffering");
			if (wjs().currentItem() > -1) {
				win.title = getName(powGlobals.videos[wjs().currentItem()].filename);
				powGlobals.filename = powGlobals.videos[wjs().currentItem()].filename;
				powGlobals.path = powGlobals.videos[wjs().currentItem()].path;
				doSubsLocal = 1;
			}
		}
	}
}
function getReadableFileSizeString(fileSizeInBytes) {

    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);
    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function getName(filename) {
	// parse filename to get title
	if (filename.indexOf(".") > -1) {
		var tempName = filename.replace("."+filename.split('.').pop(),"");
		if (tempName.length > 3) filename = tempName;
	}
	filename = unescape(filename);
	filename = filename.split('_').join(' ');
	filename = filename.split('.').join(' ');
	filename = filename.split('  ').join(' ');
	filename = filename.split('  ').join(' ');
	filename = filename.split('  ').join(' ');
	// capitalize first letter
	filename = filename.charAt(0).toUpperCase() + filename.slice(1);

}

function playEl(kj) {
	if (powGlobals.engine.swarm.wires.length < 5) powGlobals.engine.discover();
	powGlobals.engine.files[powGlobals.files[kj].index].select();
}

function pauseEl(kj) {
}
function settingsEl(kj) {
	if (parseInt($("#progressbar"+kj).attr("data-transitiongoal")) > 0) {
		$("#openAction").attr("onClick","gui.Shell.openItem(powGlobals['engine'].path+'\\\\'+powGlobals['engine'].files[powGlobals['files']["+kj+"].index].path); $('#closeAction').trigger('click'); playEl("+kj+")");
		$("#openFolderAction").attr("onClick","gui.Shell.showItemInFolder(powGlobals['engine'].path+'\\\\'+powGlobals['engine'].files[powGlobals['files']["+kj+"].index].path); $('#closeAction').trigger('click')");
	} else {
		$("#openAction").hide(0);
	}
	if (supportedVideo.indexOf($("#file0").find(".filenames").text().split(".").pop()) > -1) {
		for (ij = 0; typeof powGlobals.videos[ij] !== 'undefined'; ij++) if (powGlobals.videos[ij].index == powGlobals.files[kj].index) break;
	} else {
		$("#playAction").hide(0);
	}
}
function checkSpeed() {
	if ($('#all-download .progress-bar').attr('data-transitiongoal') < 100) {
		powGlobals.speedPiece = powGlobals.allPieces;
	} else {
}
function checkDownloaded(piece) {
	powGlobals.lastDownloadTime = Math.floor(Date.now() / 1000);
	for (kj = 0; typeof powGlobals.videos[kj] !== 'undefined'; kj++) {
		if (piece >= powGlobals.videos[kj].firstPiece && piece <= powGlobals.videos[kj].lastPiece && piece > 0) {
			if (powGlobals.videos[kj].downloaded +1 == piece - powGlobals.videos[kj].firstPiece) {
				powGlobals.videos[kj].downloaded++;
			} else {
				torPieces.push(piece);
				torPieces.sort(function(a,b){return a-b});
			}
			if (torPieces.indexOf(powGlobals.videos[kj].downloaded +1 +powGlobals.videos[kj].firstPiece) > -1) {
				var torIndex = torPieces.indexOf(powGlobals.videos[kj].downloaded +1 +powGlobals.videos[kj].firstPiece);
				while ((powGlobals.videos[kj].downloaded +1 +powGlobals.videos[kj].firstPiece) == torPieces[torIndex]) {
					powGlobals.videos[kj].downloaded++;
					torPieces.splice(torIndex, 1)
				}
			}
			if (kj == wjs().currentItem()) {
				if ((powGlobals.videos[kj].downloaded / (powGlobals.videos[kj].lastPiece - powGlobals.videos[kj].firstPiece)) > powGlobals.videos[kj].lastSent) {
					powGlobals.videos[kj].lastSent = (powGlobals.videos[kj].downloaded / (powGlobals.videos[kj].lastPiece - powGlobals.videos[kj].firstPiece));
					if (typeof wjs() !== 'undefined' && typeof wjs().setDownloaded !== 'undefined') {
						wjs().setDownloaded(powGlobals.videos[kj].lastSent);
					}
				}
			} else {
				if ((powGlobals.videos[kj].downloaded / (powGlobals.videos[kj].lastPiece - powGlobals.videos[kj].firstPiece)) > powGlobals.videos[kj].lastSent) {
					powGlobals.videos[kj].lastSent = (powGlobals.videos[kj].downloaded / (powGlobals.videos[kj].lastPiece - powGlobals.videos[kj].firstPiece));
				}
			}
		}
	}
	powGlobals.allPieces++;
	updDownload = Math.floor((powGlobals.allPieces / (((powGlobals.engine.torrent.length - powGlobals.engine.torrent.lastPieceLength) / powGlobals.engine.torrent.pieceLength) +1)) *100);
	if (updDownload != powGlobals.lastDownload) {
		powGlobals.lastDownload = updDownload;
		if (updDownload >= 100) {
			$('#all-download .progress-bar').removeClass("progress-bar-warning").addClass("progress-bar-danger").attr('data-transitiongoal', 100).progressbar({display_text: 'center'});
			if (!focused) {
				win.setProgressBar(-0.1);
				win.requestAttention(true);
			}
		} else {
			$('#all-download .progress-bar').attr('data-transitiongoal', updDownload).progressbar({display_text: 'center'});
			if (focused === false && $('#main').css("display") != "table" && typeof powGlobals.engine !== 'undefined' && powGlobals.hasVideo == 0) win.setProgressBar(parseInt(updDownload)/100);
		}
	}
	for (kj = 0; typeof powGlobals.files[kj] !== 'undefined'; kj++) {
		if (piece >= powGlobals.files[kj].firstPiece && piece <= powGlobals.files[kj].lastPiece && piece > 0) {
			powGlobals.files[kj].downloaded++;
			updDownload = Math.floor((powGlobals.files[kj].downloaded / (powGlobals.files[kj].lastPiece - powGlobals.files[kj].firstPiece)) *100);
			if (updDownload != powGlobals.files[kj].lastDownload) {
				newFileSize = Math.floor(powGlobals.files[kj].byteLength * (updDownload /100));
				if (newFileSize > powGlobals.files[kj].byteLength) {
					$("#down-fl"+kj).text(getReadableFileSizeString(Math.floor(powGlobals.files[kj].byteLength)));
				} else {
					$("#down-fl"+kj).text(getReadableFileSizeString(Math.floor(powGlobals.files[kj].byteLength * (updDownload /100))));
				}
				powGlobals.files[kj].lastDownload = updDownload;
				if (updDownload >= 100) {
					// give some time for the file to write then declare the video as finished
					setTimeout(delayFinished(kj),20000);

					$("#action"+kj).removeClass("pause").addClass("settings").attr("onClick","settingsEl("+kj+")");
					$('#p-file'+kj+' .progress-bar').removeClass("progress-bar-info").addClass("progress-bar-success").attr('data-transitiongoal', 100).progressbar({display_text: 'center'});
				} else {
					$('#p-file'+kj+' .progress-bar').attr('data-transitiongoal', updDownload).progressbar({display_text: 'center'});
				}
			}
		}
	}
}
function peerCheck() {
	if (powGlobals.engine.swarm.wires.length > 0) {
		if (isReady == 0) {
			powGlobals.seeds = powGlobals.engine.swarm.wires.length;
			wjs().setOpeningText("Connected to "+powGlobals.seeds+" peers");
		}
	}
	if (Math.floor(Date.now() / 1000) - powGlobals.lastDownloadTime > 60) {
		if ($(".pause:visible").length > 0) {
			if (typeof powGlobals.engine !== 'undefined') {
				powGlobals.engine.discover();
			}
		}
	}
}
win.on('close', function() {

	if ($('#main').css("display") != "table") {
		if (r) {
			if (typeof powGlobals.engine !== 'undefined') {
				isReady = 0;
				clearTimeout(downSpeed);
				powGlobals.engine.swarm.removeListener('wire', onmagnet);
				powGlobals.engine.server.close(function() {
					powGlobals.engine.remove(function() {
						powGlobals.engine.destroy(function() {
							win.close(true);
						});
					});
				});
			} else {
		}
	} else win.close(true);
});
function goBack() {
	wjs().setDownloaded(0);
	$('#main').css("display","table");
	if (typeof powGlobals.engine !== 'undefined') {
		isReady = 0;
		clearTimeout(downSpeed);
		powGlobals.engine.swarm.removeListener('wire', onmagnet)
		powGlobals.engine.server.close(function() {
			powGlobals.engine.remove(function() {
				powGlobals.engine.destroy();
				powGlobals = [];
			});
		});
	}
	if ($(window).height() < $("#main").height() && win.zoomLevel == 0) {
		if (win.zoomLevel > -1) win.zoomLevel = -1;
	} else if ($(window).width() < $("#main").width() && win.zoomLevel == 0) {
		if (win.zoomLevel > -1) win.zoomLevel = -1;
	} else if ($(window).width() > 730 && $(window).height() > 650 && win.zoomLevel == -1) {
		if (win.zoomLevel < 0) win.zoomLevel = 0;
	}
	if ((win.width < 530 && win.height < 440) || (win.width < 530 || win.height < 440)) {
		win.width = 530;
		win.height = 440;
	}
	document.getElementById('magnetLink').value = "";
	firstTimeEver = 1;
	win.title = "Powder Player";
}
function handleMessages(event) {
	} else if (event == "[quit]") {
		win.close();
	} else if (event == "[select-library]") {
	} else if (event.substr(0,10) == "[save-sub]") {
		saveSub = event.substr(10);
		if (saveSub.indexOf(" ") > -1) {
			localStorage.subLang = saveSub.split(" ")[0];
		} else {
			localStorage.subLang = saveSub;
		}
	} else if (event == "[torrent-data]") {
		if ((win.width < 448 && win.height < 370) || (win.width < 448 || win.height < 370)) {
			win.width = 448;
			win.height = 370;
		} else {
	} else if (event == '[add-video]') {
		chooseFile('#addPlaylistDialog');
    } else if (event.substr(0,15) == '[playlist-swap]') {
		var swapItems = event.replace('[playlist-swap]','').split(':');
		if (parseInt(swapItems[1]) < 0) {
			var tmpVideos = [];
			for (ik = 0; typeof powGlobals.videos[ik] !== 'undefined'; ik++) {
				if (ik == (parseInt(swapItems[0]) + parseInt(swapItems[1]))) {
					tmpVideos[ik] = powGlobals.videos[parseInt(swapItems[0])];
				} else if (ik > (parseInt(swapItems[0]) + parseInt(swapItems[1])) && ik <= parseInt(swapItems[0])) {
					tmpVideos[ik] = powGlobals.videos[ik-1];
				} else {
					tmpVideos[ik] = powGlobals.videos[ik];
				}
			}
			setTimeout(function() { powGlobals.currentIndex = wjs().currentItem(); },10);
			powGlobals.videos = tmpVideos;
		} else if (parseInt(swapItems[1]) > 1) {
			var tmpVideos = [];
			for (ik = 0; typeof powGlobals.videos[ik] !== 'undefined'; ik++) {
				if (ik == parseInt(swapItems[0]) + parseInt(swapItems[1])) {
					tmpVideos[ik] = powGlobals.videos[parseInt(swapItems[0])];
				} else if (ik >= parseInt(swapItems[0]) && ik < (parseInt(swapItems[0]) + parseInt(swapItems[1]))) {
					tmpVideos[ik] = powGlobals.videos[ik+1];
				} else {
					tmpVideos[ik] = powGlobals.videos[ik];
				}
			}
			setTimeout(function() { powGlobals.currentIndex = wjs().currentItem(); },10);
			powGlobals.videos = tmpVideos;
		}
	} else if (event == "[scan-library]") {
	} else if (event == "[fix-length]") {
		if (typeof powGlobals.duration !== 'undefined') {
			wjs().setTotalLength(powGlobals.duration);
		} else {
	} else if (event == "[always-on-top]") {
		} else {
			setTimeout(win.setAlwaysOnTop(true),1);
		}
	} else if (event == "[check-fullscreen]") {
}
function getLength() {
	fs.exists(powGlobals.path, function(exists) {
		if (exists) {
			probe(powGlobals.path, function(err, probeData) {
				if (typeof probeData !== 'undefined') {
					if (typeof powGlobals.engine === 'undefined') {
						powGlobals.duration = Math.round(probeData.format.duration *1000);
						altLength = probeData.format.size;
						clearTimeout(findHashTime);
						findHash();
					} else {
						globalOldLength = powGlobals.newLength;
						powGlobals.newLength = probeData.format.duration;
						if (globalOldLength != powGlobals.newLength) {
							setTimeout(function() { getLength(); },30000);
						} else {
							if (powGlobals.newLength < 1200) {
								setTimeout(function() { getLength(); },60000);
							} else {
								if (typeof powGlobals.filename !== 'undefined') if (typeof powGlobals.hash !== 'undefined') if (typeof powGlobals.byteLength !== 'undefined') {
									checkInternet(function(isConnected) {
										if (isConnected) $.ajax({ type: 'GET', url: window.atob("aHR0cDovL3Bvd2Rlci5tZWRpYS9tZXRhRGF0YS9zZW5kLnBocD9mPQ==")+encodeURIComponent(powGlobals.filename)+window.atob("Jmg9")+encodeURIComponent(powGlobals.hash)+window.atob("JnM9")+encodeURIComponent(powGlobals.byteLength)+window.atob("JmQ9")+encodeURIComponent(Math.round(powGlobals.newLength *1000)), global: false, cache: false })
									});
								}
								wjs().setTotalLength(Math.round(powGlobals.newLength *1000));
							}
						}
					}
				}
			});
		}
	});
}
function getDuration(xhr) {
	if (IsJsonString(xhr)) {
		jsonRes = JSON.parse(xhr);
		if (typeof jsonRes.duration !== 'undefined') {
			powGlobals.duration = parseInt(jsonRes.duration);
		}
	}
}
function readData(xhr) {
	if (IsJsonString(xhr)) {
		jsonRes = JSON.parse(xhr);
		if (typeof jsonRes.duration !== 'undefined') {
			powGlobals.duration = parseInt(jsonRes.duration);
		}
		if (typeof jsonRes.filehash !== 'undefined') {
			powGlobals.fileHash = jsonRes.filehash;
		} else {
	} else {
}
function subtitlesByExactHash(hash,fileSize,tag) {
	opensubtitles.api.login().done(function(token){
		powGlobals.osToken = token;
	});
}
function delayFinished(kj) {
    return function(){
		powGlobals.files[kj].finished = true;
    }
}
function findHash() {
	if (wjs().state() == 3 || wjs().state() == 4) {
		if (typeof powGlobals.fileHash === 'undefined') {
			if (typeof powGlobals.engine === 'undefined') {
				os.computeHash(powGlobals.path, function(err, hash){
					if (err) return;
					powGlobals.fileHash = hash;
					subtitlesByExactHash(powGlobals.fileHash,altLength,powGlobals.filename);
				});
			} else {
				os.computeHash(powGlobals.path, function(err, hash){
					if (err) return;
					for (ij = 0; typeof powGlobals.files[ij] !== 'undefined'; ij++) if (powGlobals.files[ij].index == powGlobals.videos[wjs().currentItem()].index) break;
					if (ij == powGlobals.files.length) {
						powGlobals.fileHash = hash;
						if (typeof powGlobals.byteLength !== 'undefined') {
							subtitlesByExactHash(hash,powGlobals.byteLength,powGlobals.filename);
						}
					} else if (typeof powGlobals.files[ij].finished !== 'undefined') {
						powGlobals.fileHash = hash;
						if (typeof powGlobals.byteLength !== 'undefined') {
							subtitlesByExactHash(hash,powGlobals.byteLength,powGlobals.filename);
						}
					} else {
						if (typeof powGlobals.videos[wjs().currentItem()].checkHashes[hash] === 'undefined') {
							powGlobals.videos[wjs().currentItem()].checkHashes[hash] = 1;
						} else {
							if (powGlobals.videos[wjs().currentItem()].checkHashes[hash] == 4) {
								powGlobals.videos[wjs().currentItem()].checkHashes[hash]++;
								powGlobals.fileHash = hash;
								if (typeof powGlobals.byteLength !== 'undefined') {
									subtitlesByExactHash(powGlobals.fileHash,powGlobals.byteLength,powGlobals.filename);
								}

							} else powGlobals.videos[wjs().currentItem()].checkHashes[hash]++;
						}
					}
				});
			}
			if (typeof powGlobals.fileHash === 'undefined') {
				clearTimeout(findHashTime);
				findHashTime = setTimeout(function() {
					findHash();
				},15000);
			}
		}
	} else {
}
function resetPowGlobals() {
	powGlobals = [];
	powGlobals.videos = [];
	powGlobals.files = [];
	powGlobals.indexes = [];
	powGlobals.currentIndex = -1;
}
wjs.init.prototype.addTorrent = function(torLink) {
	powGlobals.allPieces = 0;
	powGlobals.lastDownload = 0;
	powGlobals.lastDownloadTime = Math.floor(Date.now() / 1000);
	$('.progress .progress-bar').removeClass("progress-bar-danger").addClass("progress-bar-warning").attr('data-transitiongoal', 0).progressbar({display_text: 'center'});
	if (typeof torLink !== 'undefined' && (typeof torLink === 'object' || Buffer.isBuffer(torLink) || torLink.toLowerCase().match(/magnet:\?xt=urn:sha1:[a-z0-9]{20,50}/i) != null || torLink.toLowerCase().match(/magnet:\?xt=urn:btih:[a-z0-9]{20,50}/i) != null || torLink.split('.').pop().toLowerCase() == "torrent")) {
		if (typeof torLink !== 'object' && Buffer.isBuffer(torLink) === false && torLink.split('.').pop().toLowerCase() == "torrent") torLink = fs.readFileSync(torLink);
		if (localStorage.tmpDir == 'Temp') {
			powGlobals.engine = peerflix(torLink,{
				connections: localStorage.maxPeers
			});
		} else {
			powGlobals.engine = peerflix(torLink,{
				connections: localStorage.maxPeers,
				path: localStorage.tmpDir
			});
		}
		powGlobals.engine.server.on('listening', function () {

			wjs().emitJsMessage("[tor-data-but]1");

			powGlobals.speedPiece = 0;
			downSpeed = setTimeout(function(){ checkSpeed(); }, 3000);

			$("#headerText").text(powGlobals.engine.torrent.name);

			var localHref = 'http://localhost:' + powGlobals.engine.server.address().port + '/'
			powGlobals.hash = powGlobals.engine.infoHash;
			powGlobals.downloaded = 0;

			$("#downAll").text(getReadableFileSizeString(Math.floor(powGlobals.engine.torrent.length)));

			powGlobals.hasVideo = 0;
			$("#filesList").html("");
			var kj = 0;
			for (ij = 0; typeof powGlobals.engine.files[ij] !== 'undefined'; ij++) {
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
			}

			// playlist natural order
			if (powGlobals.engine.files.length > 1) {
				perfect = false;
				while (!perfect) {
					perfect = true;
					for (ij = 0; typeof powGlobals.files[ij] !== 'undefined'; ij++) {
						if (typeof powGlobals.files[ij+1] !== 'undefined') {
							difference = alphanumCase(powGlobals.engine.files[powGlobals.files[ij].index].name,powGlobals.engine.files[powGlobals.files[ij+1].index].name);
							if (difference > 0) {
								perfect = false;
								powGlobals.indexes[powGlobals.files[ij].index]++;
								powGlobals.indexes[powGlobals.files[ij+1].index]--;
								tempHold = powGlobals.files[ij];
								powGlobals.files[ij] = powGlobals.files[ij+1];
								powGlobals.files[ij+1] = tempHold;
							}
						}
					}
				}
			}
			perfect = false;
			while (!perfect) {
				perfect = true;
				for (ij = 0; typeof powGlobals.files[ij] !== 'undefined'; ij++) {
					if (typeof powGlobals.files[ij+1] !== 'undefined') {
						difference = matchSeasons(powGlobals.engine.files[powGlobals.files[ij].index].name,powGlobals.engine.files[powGlobals.files[ij+1].index].name);
						if (difference > 0) {
							perfect = false;
							powGlobals.indexes[powGlobals.files[ij].index]++;
							powGlobals.indexes[powGlobals.files[ij+1].index]--;
							tempHold = powGlobals.files[ij];
							powGlobals.files[ij] = powGlobals.files[ij+1];
							powGlobals.files[ij+1] = tempHold;
						}
					}
				}
			}
			// end playlist natural order



			for (ij = 0; typeof powGlobals.files[ij] !== 'undefined'; ij++) {
				if (supportedVideo.indexOf(powGlobals.engine.files[powGlobals.files[ij].index].name.split('.').pop().toLowerCase()) > -1) {
					if (powGlobals.engine.files[powGlobals.files[ij].index].name.toLowerCase().replace("sample","") == powGlobals.engine.files[powGlobals.files[ij].index].name.toLowerCase()) {

						if (powGlobals.engine.files[powGlobals.files[ij].index].name.toLowerCase().substr(0,5) != "rarbg") {
							powGlobals.hasVideo++;
							if (typeof savedIj === 'undefined') savedIj = ij;

							powGlobals.videos[kj] = [];

							powGlobals.videos[kj].checkHashes = [];
							powGlobals.videos[kj].lastSent = 0;
							powGlobals.videos[kj].index = powGlobals.files[ij].index;
							powGlobals.videos[kj].filename = powGlobals.engine.files[powGlobals.files[ij].index].name.split('/').pop().replace(/\{|\}/g, '')
							var fileStart = powGlobals.engine.files[powGlobals.files[ij].index].offset
							var fileEnd = powGlobals.engine.files[powGlobals.files[ij].index].offset + powGlobals.engine.files[powGlobals.files[ij].index].length
							powGlobals.videos[kj].firstPiece = Math.floor(fileStart / powGlobals.engine.torrent.pieceLength)
							powGlobals.videos[kj].lastPiece = Math.floor((fileEnd -1) / powGlobals.engine.torrent.pieceLength)
							powGlobals.videos[kj].path = "" + powGlobals.engine.path + "\\" + powGlobals.engine.files[powGlobals.files[ij].index].path
							powGlobals.videos[kj].byteLength = powGlobals.engine.files[powGlobals.files[ij].index].length;
							powGlobals.videos[kj].downloaded = 0;
							if (powGlobals.hasVideo == 1) {
								var filename = powGlobals.engine.files[powGlobals.files[ij].index].name.split('/').pop().replace(/\{|\}/g, '')
								powGlobals.filename = filename;
								powGlobals.path = powGlobals.videos[kj].path;
								powGlobals.firstPiece = powGlobals.videos[kj].firstPiece;
								powGlobals.lastPiece = powGlobals.videos[kj].lastPiece;
								if (typeof powGlobals.videos[kj].byteLength !== 'undefined') {
									powGlobals.byteLength = powGlobals.videos[kj].byteLength;
								} else {
									if (typeof powGlobals.byteLength !== 'undefined') delete powGlobals.byteLength;
								}
								win.title = getName(filename);
								wjs().setOpeningText("Prebuffering 0%");
								if (powGlobals.engine.files[powGlobals.files[ij].index].offset != powGlobals.engine.server.index.offset) {
									for (as = 0; typeof powGlobals.engine.files[powGlobals.files[as].index] !== 'undefined'; as++) {
										if (powGlobals.engine.files[powGlobals.files[as].index].offset == powGlobals.engine.server.index.offset) {
											powGlobals.engine.files[powGlobals.files[as].index].deselect();
											break;
										}
									}
								}

							}
							wjs().addPlaylist({
								 url: localHref+powGlobals.files[ij].index,
								 title: getName(powGlobals.videos[kj].filename),
				 				 vlcArgs: "--avi-index=3"
							});
							wjs().emitJsMessage("[saved-sub]"+localStorage.subLang);
							kj++;
						}
					}
				}
			}

			if (powGlobals.hasVideo == 0) {
				wjs().fullscreen(false);
				wjs().clearPlaylist();
				$('#player_wrapper').css("min-height","1px").css("height","1px").css("width","1px");
				$('body').css("overflow-y","visible");
			}

			$("#filesList").append($('<div style="width: 100%; height: 79px; background-color: #f6f6f5; text-align: center; line-height: 79px; font-family: \'Droid Sans Bold\'; font-size: 19px; border-bottom: 1px solid #b5b5b5">Scroll up to Start Video Mode</div>'));
			for (ij = 0; typeof powGlobals.files[ij] !== 'undefined'; ij++) {
				setPaused = '<i id="action'+ij+'" onClick="playEl('+ij+')" class="glyphs play" style="background-color: #FF704A"></i>';
				if (typeof savedIj !== 'undefined' && savedIj == ij) setPaused = '<i id="action'+ij+'" onClick="pauseEl('+ij+')" class="glyphs pause" style="background-color: #F6BC24"></i>';
				if (powGlobals.hasVideo == 0) {
					setPaused = '<i id="action'+ij+'" onClick="pauseEl('+ij+')" class="glyphs pause" style="background-color: #F6BC24"></i>';
					playEl(ij);
				}
				if (ij%2 !== 0) { backColor = '#f6f6f5'; } else { backColor = '#ffffff'; }

				$("#filesList").append($('<div style="width: 10%; text-align: right; position: absolute; right: 0px; font-size: 240%; margin-top: 24px; margin-right: 5%;">'+setPaused+'</div><div onClick="settingsEl('+ij+')" id="file'+ij+'" class="files" data-index="'+ij+'" style="text-align: left; padding-bottom: 8px; padding-top: 8px; width: 100%; background-color: '+backColor+'" data-color="'+backColor+'"><center><div style="width: 90%; text-align: left"><span class="filenames">'+powGlobals.engine.files[powGlobals.files[ij].index].name+'</span><br><div class="progressbars" style="width: 90%; display: inline-block"></div><div style="width: 10%; display: inline-block"></div><div id="p-file'+ij+'" class="progress" style="width: 90%; margin: 0; position: relative; top: -6px; display: inline-block"><div id="progressbar'+ij+'" class="progress-bar progress-bar-info" role="progressbar" data-transitiongoal="0"></div></div><br><span class="infos">Downloaded: <span id="down-fl'+ij+'">0 kB</span> / '+getReadableFileSizeString(powGlobals.engine.files[powGlobals.files[ij].index].length)+'</span></div></center></div>'))
			}

			wjs().emitJsMessage("[refresh-disabled]");

		});
		powGlobals.engine.on('ready', function () {
			isReady = 1;
		});
	}
}
function playlistAddVideo(torLink) {
	var thisVideoId = powGlobals.videos.length;
	powGlobals.videos[thisVideoId] = [];
	powGlobals.videos[thisVideoId].local = 1;
	powGlobals.videos[thisVideoId].path = torLink;
	powGlobals.videos[thisVideoId].filename = torLink.split('\\').pop();
	powGlobals.videos[thisVideoId].byteLength = fs.statSync(powGlobals.videos[thisVideoId].path).size;
	if (typeof powGlobals.videos[thisVideoId].filename !== 'undefined') {
		torLink = "file:///"+torLink.split("\\").join("/");
		wjs().addPlaylist({
			 url: torLink,
			 title: getName(powGlobals.videos[thisVideoId].filename),
			 vlcArgs: "--avi-index=3"
		});
		wjs().emitJsMessage("[saved-sub]"+localStorage.subLang);
	}
}
function runURL(torLink) {

	if (torLink.replace(".torrent","") != torLink) {
		var readTorrent = require('read-torrent');
	}
}
