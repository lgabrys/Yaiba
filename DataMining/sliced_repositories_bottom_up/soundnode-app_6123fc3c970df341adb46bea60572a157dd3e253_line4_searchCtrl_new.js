app.controller('searchCtrl', function ($scope, $http, $stateParams) {
    $scope.title = 'Results for: ' + $stateParams.q;
});
