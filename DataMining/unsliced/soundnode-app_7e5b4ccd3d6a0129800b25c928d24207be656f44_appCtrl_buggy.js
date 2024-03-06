'use strict';

app.controller('AppCtrl', function ($rootScope, $scope, $window, $log, ngDialog) {

    // Settings sub nav (dropdown)
    $scope.isSettingsVisible = false;

    // Os detection
    $scope.isRunningLinux = process.platform == 'linux32' || process.platform == 'linux64';
    $scope.isRunningWindows = process.platform == 'win32';
    $scope.isRunningMac = process.platform == 'darwin';

    $scope.toggleSettings = function() {
        if ( $scope.isSettingsVisible ) {
            $scope.isSettingsVisible = false;
        } else {
            $scope.isSettingsVisible = true;
        }
    };

    // check if track has Art work
    // otherwise replace to Soundnode App logo
    $scope.showBigArtwork = function (img) {
        var newArtwork;
        if ( ! (angular.isUndefined(img) || img === null) ) {
            newArtwork = img.replace('large', 't300x300');
            return newArtwork;
        } else {
            newArtwork = 'public/img/logo-short.png';
            return newArtwork;
        }
    };

    // Format song duration on tracks
    // for human reading
    $scope.formatSongDuration = function (duration) {
        var minutes = Math.floor(duration / 60000)
            , seconds = ((duration % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    /*
    * Navigation back and forward
    */
    $scope.goBack = function() {
        $window.history.back();
    };

    $scope.goForward = function() {
        $window.history.forward();
    };

    // Close all open modals
    $scope.closeModal = function() {
        ngDialog.closeAll();
    };

});
