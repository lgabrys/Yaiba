function settingsCtrl($scope, appSettings) {
    $scope.themes = appSettings.theme_list;
    $scope.editor_themes = appSettings.editor_theme_list;
    $scope.theme = appSettings.get('theme') || 'default';
    $scope.editor_theme = appSettings.get('editor_theme') || 'tomorrow';
    $scope.token = appSettings.get('token') || '';
    $scope.avatar = appSettings.get('avatar') || '';
    $scope.update_settings = function () {
    };
}

function listGistCtrl($scope, ghAPI, gistData) {
    $scope.gists = gistData.list;
}
function singleGistCtrl($scope, $routeParams, gistData, ghAPI) {
    $scope.gist = gistData.getGistById($routeParams.gistId);
    if ($scope.gist.hasOwnProperty('single') && $scope.gist.single.hasOwnProperty('lastUpdated')) {
        console.log($scope.gist.single.lastUpdated);
    }
}
