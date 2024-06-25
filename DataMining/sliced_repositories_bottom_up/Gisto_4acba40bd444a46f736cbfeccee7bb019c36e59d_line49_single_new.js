function singleGistCtrl($scope, $routeParams, gistData, ghAPI, $rootScope, notificationService) {
    $scope.gist = gistData.getGistById($routeParams.gistId);
    $scope.share = function() {
        if ($scope.userToShare) {
            notificationService.send('sendNotification', { recipient: $scope.userToShare, gistId: $scope.gist.id, name: $scope.gist.description, gravatar_id: $scope.gist.user.gravatar_id});
        } else {
    };
    $scope.copyToClipboard = function (data, message,type) {
        message = message || 'Content of a file <b>' + data.filename + '</b> copied to clipboard';
    };
    $scope.goToGist = function (user, id, file) {
        console.log('url', 'https://gist.github.com/' + user + '/' + id + '/#file-' + file.replace(/[.]/gi, '-'));
    };
}
