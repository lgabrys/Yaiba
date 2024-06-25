(function () {
    function createGistCtrl($scope, $rootScope, ghAPI, gistData, appSettings, $timeout) {
        $scope.description = '';
        appSettings.loadSettings().then(function (defaults) {
            $scope.isPublic = !!defaults.new_gist_public;
        });
        $scope.files = [
        ];
        $scope.addFile = function () {
        };
        $scope.deleteFile = function (index) {
        };
        $scope.enableEdit = function () {
            $rootScope.edit = true;
        };
        $scope.disableEdit = function () {
            $rootScope.edit = false;
        };
        $scope.dragStart = function (e) {
        };
        $scope.drop = function (e) {
            var data = event.dataTransfer;
            for (var i = 0; i < data.files.length; i++) { // For each dropped file or directory
                $rootScope.$apply(function () {
                    $rootScope.edit = true;
                });
            }
        };
        $scope.dragEnd = function (e) {
        };
        $scope.save = function ($event) {
            var data = {
                description: $scope.description,
                "public": $scope.isPublic,
                files: {}
            };
            for (var file in $scope.files) {
                if (!$scope.files[file].filename) {
                    $scope.files[file].filename = 'new_file' + file;
                }
                data.files[$scope.files[file].filename] = {
                    content: $scope.files[file].content
                };
            }
            if (!Object.keys(data.files).length) {
                $('.files-error').slideDown('slow');
                $timeout(function() {
                    $('.files-error').slideUp();
                }, 2500);
                return;
            }
        };
    }
})();
