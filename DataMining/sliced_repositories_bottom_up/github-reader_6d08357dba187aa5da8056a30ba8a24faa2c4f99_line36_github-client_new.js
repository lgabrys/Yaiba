var Promise = require("bluebird");
var GitHubApi = require("github");
function newClient(userData) {
    var githubClient = new GitHubApi({
        version: "3.0.0",
    });
    githubClient.authenticate({
    });
}
function GithubClientPromise(client) {
    this.client = client;
}
GithubClientPromise.prototype.eventsAsPromise = function (user) {
    var client = this.client;
    return new Promise(function (resolve, reject) {
        client.events.getReceived({ user: user },
            function (error, events) {
                if (error) {
                    return reject(error);
                }
            });
    });
};
GithubClientPromise.prototype.notificationsAsPromise = function () {
    return new Promise(function (resolve, reject) {
        var options = {
            all : true
        };
    });
};
