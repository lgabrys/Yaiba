app.controller('ProfileCtrl', function ($scope, SCapiService, $rootScope, $stateParams) {
    var userId = $stateParams.id;
    $scope.isFollowing = false;
    $scope.profile_data = '';
    $scope.followers_count = '';
    $scope.busy = false;
    $scope.data = '';
    $scope.follow_button_text = '';
    SCapiService.getProfile(userId)
        .then(function(data) {
            $scope.profile_data = data;
            $scope.profile_data.description = data.description.replace(/\n/g, '<br>');
        }).finally(function() {
});
