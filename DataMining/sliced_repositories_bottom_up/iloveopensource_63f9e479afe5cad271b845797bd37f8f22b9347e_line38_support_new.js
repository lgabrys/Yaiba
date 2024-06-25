var mongoose = require('mongoose'),
	_ = require('lodash'),
	Project = mongoose.model('Project'),
	Schema = mongoose.Schema
var SupportSchema = new Schema({
})
SupportSchema.statics.getSupportByUser = function (userId, callback) {
	var self = this
	this.find({user: userId}, function (error, supports) {
	})
}
SupportSchema.statics.updateSupportByUser = function (userId, repos, cb) {
	var self = this
	var support = _.map(repos, function (repo) {
		return {
			user: userId,
			project: repo._id,
			contributing: repo.support.contributing === 'true',
			donating: repo.support.donating === 'true',
			supporting: repo.support.supporting === 'true'
		}
	})
}
