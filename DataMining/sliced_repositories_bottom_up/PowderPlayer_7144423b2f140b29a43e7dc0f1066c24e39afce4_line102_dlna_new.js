var dlna = {},
	castData = {},
	oldDlnaData = {},
	oldHttpServer = false,
	pUrl = require('url'),
	samsungDlna = {},
	nextStartDlna = 0;
dlna.clients = [];
dlna.checks = 0;
dlna.started = false;
dlna.initiated = false;
samsungDlna.retries = 0;
function resetDlnaGlobals() {
	dlna = {};
	dlna.clients = [];
	dlna.checks = 0;
	dlna.started = false;
}
function setDlnaOpts() {
	dlna.started = true;
	castData.casting = 1;
	castData.castingPaused = 0;
	if (dlna.lastSecond > 0) {
		if (dlna.lastSecond > 30) {
			dlna.controls.seek(dlna.lastSecond);
			wjs().setOpeningText("Streaming to TV ...");
			samsungDlna.retries = 0;
		}
		dlna.lastSecond = 0;
	}
}
function sendDlnaData(dlnaTime,dlnaLength) {
	castData.castTime = dlnaTime * 1000;
	castData.castLength = dlnaLength * 1000;
	castData.castPos = (dlnaTime / dlnaLength);
	dlna.lastPos = castData.castPos;
	if (castData.castTime > 0 && castData.casting == 0) {
		castData.casting = 1;
		castData.castingPaused = 0;

		player.wrapper.find(".wcp-play").removeClass("wcp-play").addClass("wcp-pause");
		player.wrapper.find(".wcp-replay").removeClass("wcp-replay").addClass("wcp-pause");
	}
}
function resetDlnaData(keepCasting,cb) {
	if (typeof keepCasting === 'function') {
		cb = keepCasting;
		keepCasting = false;
	} else keepCasting = typeof keepCasting !== 'undefined' ? keepCasting : false;
	if (keepCasting) {
		castData.casting = 1;
		castData.castingPaused = 0;
	}
	else castData.casting = 0;
	castData.castTime = 0;
	castData.castLength = 0;
	castData.castPos = 0;
	castData.castingPaused = 2;
}
function stopDlna(noSubs) {
	if (dlna.controls) dlna.controls.stop();
}
