/**
 * Author: krasu
 * Date: 8/17/13
 * Time: 4:44 PM
 */


var _ = require('lodash'),
	mongoose = require('mongoose'),
	ensureAuthenticated = require('../utils/ensure-auth'),
	Support = mongoose.model('Support'),

module.exports = function (app) {
	app.get('/maintainer', ensureAuthenticated, function (req, res) {
		res.render('maintainer-editor', { user: req.user, activeTab: 'maintainers' });
	});
};
