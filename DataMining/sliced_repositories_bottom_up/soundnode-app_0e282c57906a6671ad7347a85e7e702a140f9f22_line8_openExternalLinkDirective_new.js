app.directive('openExternal', function () {
    return {
        link: function ($scope, elem, attrs) {
            elem.bind('click', function (e) {
                e.preventDefault();
            });
        }
    }
})
