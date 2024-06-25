define(function (require) {
	var toastr = require('toastr')
	var RepoList = require('./repo-list')
	var urlRegExp = /^((https+:\/\/github.com\/)([^\/]+)\/([^\/#]+)\/*)(.*)$/
	return RepoList.extend({
		minLength: 5,
	});
})
