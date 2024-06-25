'use strict';
function listGistCtrl($scope, ghAPI, gistData) {
    $scope.gists = gistData.list;
}
function singleGistCtrl($scope, $routeParams, gistData, ghAPI) {
    $scope.gist = gistData.getGistById($routeParams.gistId);
    $scope.copyToClipboard = function (file) {
        if (clipboard !== undefined) {
            clipboard.set(file.content, 'text');
        } else {
    };
    $scope.enableEdit = function () {
        $scope.edit = true;
    };
    $scope.disableEdit = function () {
        $scope.edit = false;
    };
    $scope.warnDeleteGist = function () {
        $('.delete').slideDown('slow');
    };
    $scope.cancelDeleteGist = function () {
        $('.delete').slideUp('slow');
    };
    $scope.del = function ($event) {
        if ($event) {
            $event.preventDefault();
        }
    };
    $scope.addFile = function () {
        var fileName = 'newFile' + Object.keys($scope.gist.single.files).length + '.txt';
        $scope.gist.single.files[fileName] = {
        };
    };
    $scope.dragStart = function (e) {
        e.stopPropagation();
    };
    $scope.drop = function (e) {
        e.stopPropagation();
        var data = event.dataTransfer;
        for (var i = 0; i < data.files.length; i++) { // For each dropped file
            var file = data.files[i];
            var reader = new FileReader();
            reader.onloadend = (function (filename) {
                return function (event) {
                    $scope.gist.single.files[filename] = {
                    };
                }
            })(file.name);
        }
    };
    $scope.dragEnd = function (e) {
        e.stopPropagation();
    };
    $scope.update = function ($event) {
        $('.loading span').text('Saving...');
    };
}
