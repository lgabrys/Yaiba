app.controller('AppCtrl', function ($rootScope, $scope, $window, $log, ngDialog) {
    $scope.isSettingsVisible = false;
    $scope.isRunningLinux = process.platform == 'linux32' || process.platform == 'linux64';
});
