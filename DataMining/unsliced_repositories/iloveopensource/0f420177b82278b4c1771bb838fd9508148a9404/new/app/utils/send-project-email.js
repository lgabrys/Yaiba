/**
 * Author: krasu
 * Date: 9/27/13
 * Time: 4:00 PM
 */
var cfg = require('../../config'),
	async = require('async'),
	_ = require('lodash'),
	ejs = require('ejs'),
	fs = require('fs'),
	path = require('path'),
	mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	User = mongoose.model('User'),
	templates = {}



module.exports = function (projectData, message, currentUser, templateName, subjectCb, userCb) {
	if (!projectData || _.isEmpty(projectData)) return userCb('Wrong params')

	var projectId = projectData._id
	var mailOptions = {
		from: cfg.emails.from,
		to: cfg.emails.to
	}

	async.waterfall([
		function (cb) {
			if (projectId) return cb(null, true)
			Project.createIfNotExists(projectData, cb)
		},
		function (project, cb) {
			Project.findById(projectId || project._id).populate('owner.user').exec(cb)
		},
		function (project, cb) {
			mailOptions.subject = subjectCb && subjectCb(project)

			if (templateName == 'comment-for-author' && project.donateMethods.emailMe) {
				mailOptions.to += ',' + project.donateMethods.emailMe
			}

			if (templateName == 'request-contribution' && project.owner.user &&  project.owner.user.email) {
				mailOptions.to += ',' + project.owner.user.email
			}

			mailOptions.html = ejs.render(templates[templateName], {
				serverUrl: cfg.fullUrl(),
				user: currentUser,
				project: project,
				message: message
			})

			cb(null, mailOptions)
		},
		cfg.emails.transport.sendMail
	], userCb)
}