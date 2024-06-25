(function () {
    bugsnagHttpInterceptor.$inject = ['$q', 'bugsnag'];
    function bugsnagHttpInterceptor($q, bugsnag) {
        function handleError(rejection) {
            console.log(rejection);
            if (!shouldNotSendError(rejection)) {
                bugsnag.notify("AjaxError", rejection.status + ' on ' + rejection.config.url, {
                    request: {
                        status: rejection.status,
                        statusText: rejection.statusText,
                        url: rejection.config.url,
                        method: rejection.config.method,
                        data: JSON.stringify(rejection.config.data)
                    },
                    headers: {
                        headers: rejection.headers()
                    },
                    data: {
                        data: rejection.data
                    }
                }, "error");
            }
        }
    }
})();
