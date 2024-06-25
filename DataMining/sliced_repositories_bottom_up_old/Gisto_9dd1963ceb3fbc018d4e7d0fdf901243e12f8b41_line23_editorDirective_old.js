angular.module('gisto.directive.editor', []).directive('editor', ['$timeout', 'appSettings', function ($timeout, appSettings) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.showmd = false;
            if ($attrs.language === 'markdown') {
                $scope.showmd = true;
            }
            appSettings.loadSettings().then(function (appSettingsResult) {
                $timeout(function () {
                        editor = ace.edit('editor-' + $attrs.index),
                }, 0);
            });
        }
    };
}]);
