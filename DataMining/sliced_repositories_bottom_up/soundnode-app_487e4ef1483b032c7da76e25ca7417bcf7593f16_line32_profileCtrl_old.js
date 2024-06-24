app.controller('ProfileCtrl', function (
    $scope,
    $rootScope,
    $stateParams,
    SCapiService,
) {
    var userId = $stateParams.id;
    $scope.isFollowing = false;
    $scope.profile_data = '';
    $scope.followers_count = '';
    $scope.busy = false;
    $scope.data = '';
    $scope.isLoggedInUser = userId == $rootScope.userId;
    $scope.follow_button_text = '';
    SCapiService.getProfile(userId)
        .then(function(data) {
            $scope.profile_data = data;
            $scope.profile_data.description = data.description && data.description.replace(/\n/g, '<br>') || '';
        }).finally(function() {
});
