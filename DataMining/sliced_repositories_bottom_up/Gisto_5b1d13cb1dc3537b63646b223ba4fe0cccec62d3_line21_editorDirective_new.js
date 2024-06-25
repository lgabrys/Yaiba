angular.module('gisto.directive.editor', []).directive('editor', ['$timeout', 'appSettings', function ($timeout, appSettings) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.showmd = false;
            if ($attrs.language === 'markdown') {
                $scope.showmd = true;
            }
            appSettings.loadSettings().then(function (appSettingsResult) {
                $timeout(function () {
                        font = parseInt(appSettingsResult.font_size),
                }, 0);
            });
        }
    };
}]);
