app.service('SCapiService', function ($http, $window, $q, $log, $state, $stateParams, $rootScope, ngDialog) {
    function rateLimitReached() {
        ngDialog.open({
        });
    }
    this.isLoading = function () {
        $rootScope.isLoading = true;
    };
    this.getFavoritesIds = function(next_href) {
        var url = next_href || 'https://api.soundcloud.com/me/favorites/ids.json?linked_partitioning=1&limit=200&oauth_token=' + $window.scAccessToken,
            that = this;
        return $http.get(url)
            .then(function(response) {
                if (typeof response.data === 'object') {
                    if ( response.data.hasOwnProperty('next_href')) {
                        // next_href exists
                        // run loop till no next_href
                        return that.getFavoritesIds(response.data.next_href)
                            .then(function (next_href_response) {
                                // sums all likes ids from loops
                                return response.data.collection.concat(next_href_response.collection);
                        })
                    } else {
                        return response.data.collection;
                    }
                } else {
            });
    };
});
