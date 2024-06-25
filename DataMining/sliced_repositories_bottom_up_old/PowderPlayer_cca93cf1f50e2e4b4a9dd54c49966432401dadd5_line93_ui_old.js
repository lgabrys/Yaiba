$(document).ready(function() {
    $('.progress .progress-bar').progressbar({display_text: 'center'});
});
function settingsEl(kj) {
	if (supportedVideo.indexOf($("#file"+kj).find(".filenames").text().split(".").pop().toLowerCase()) > -1) {
		powGlobals.videos.some(function(el,ij) {
			if (el.index == powGlobals.files[kj].index) {
			}
		});
	} else {
}
