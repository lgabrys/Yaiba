app.controller('StreamCtrl', function ($scope, SCapiService, $rootScope) {
    var endpoint = 'me/activities'
        , params = 'limit=33';
    $scope.title = 'Stream';
    $scope.data = '';
    $scope.busy = false;
    $scope.likes = '';
    SCapiService.get(endpoint, params)
        .then(function(data) {
            $scope.data = data.collection;
        }).finally(function() {
            SCapiService.getFavoritesIds()
                .then(function(data) {
                    $scope.likes = data;
                }).finally(function() {
                    $rootScope.isLoading = false;
                });
        });
    $scope.loadMore = function() {
        $scope.busy = true;
            }).finally(function(){
                $scope.busy = false;
                $rootScope.isLoading = false;
            });
    };
    function markLikedTracks (tracks) {
        var tracksData = tracks.collection || tracks;
        for (var i = 0; i < tracksData.length; ++i) {
            var track = tracksData[i].origin;
            if (track.hasOwnProperty('user_favorite'))
                track.user_favorite = ($scope.likes.collection.indexOf(track.id) != -1);
        }
    }
});
