app.directive('favoriteSong', function($rootScope, $log, SCapiService, $timeout, $state, $stateParams, notificationFactory) {
    return {
        link: function($scope, elem, attrs) {
            elem.bind('click', function() {
                if ( $scope.favorite === true ) {
                } else {
            });
        }
    }
});
