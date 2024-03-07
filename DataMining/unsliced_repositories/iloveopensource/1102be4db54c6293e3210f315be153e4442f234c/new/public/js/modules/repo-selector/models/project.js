/**
 * Author: krasu
 * Date: 8/17/13
 * Time: 2:51 PM
 */
define(function (require) {
	require('backbone')
	var Repo = require('./repo')
	var Support = require('./support')

	return Repo.extend({
		idAttribute: 'githubId',
		isProject: true,
		parse: function (entity) {
			var result = entity
			if (entity.project) {
				result = _.extend(entity.project, {
					support: {
						contributing: entity.contributing,
						donating: entity.donating,
						supporting: entity.supporting
					}
				})
			}

			result.support = new Support(result.support)

			return result;
		},
		destroy: function (options) {
			options = options || {}
			options.data = JSON.stringify({id: this.get('_id')})
			options.contentType = 'application/json'

			return Backbone.Model.prototype.destroy.apply(this, [options])
		}
	})
})