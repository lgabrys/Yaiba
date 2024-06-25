/**
 * Author: krasu
 * Date: 8/17/13
 * Time: 4:44 PM
 */


var _ = require('lodash'),
	mongoose = require('mongoose'),
	ensureAuthenticated = require('../utils/ensure-auth'),

	Project = mongoose.model('Project'),
	Organization = mongoose.model('Organization'),
	Support = mongoose.model('Support'),

module.exports = function (app) {
	app.get('/supporter/github/*', ensureAuthenticated, function (req, res) {
		var path = req.params[0]
		if (!path) return res.send(500, 'wrong request')
	})

	app.get('/supporter/support/:type/:by', ensureAuthenticated, function (req, res) {
	})
	app.put('/supporter/support/:type/:by/[0-9]+', ensureAuthenticated, function (req, res) {
		Project.createIfNotExists(req.body, function (err, project) {
		})
	})
	app.delete('/supporter/support/:type/:by/[0-9]+', ensureAuthenticated, function (req, res) {
		Support.removeEntry(req.user, req.param('type'), req.param('by'), req.body.id, function (error, supports) {
		})
	})
};
