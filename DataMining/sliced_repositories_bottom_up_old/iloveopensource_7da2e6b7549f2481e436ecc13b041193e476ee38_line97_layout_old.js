define(function (require) {
	return Backbone.View.extend({
		getProjectLink: function () {
			var link = []
			return link.join('/')
		}
	});
})
