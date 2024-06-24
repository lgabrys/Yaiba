/**
 * Author: krasu
 * Date: 8/17/13
 * Time: 4:44 PM
 */


var _ = require('lodash'),
	mongoose = require('mongoose'),
	ensureAuthenticated = require('../utils/ensure-auth'),

	Organization = mongoose.model('Organization'),
	Support = mongoose.model('Support'),

module.exports = function (app) {
	app.get('/supporter', ensureAuthenticated, function (req, res) {
		res.render('repo-editor', { user: req.user });
	});
};
