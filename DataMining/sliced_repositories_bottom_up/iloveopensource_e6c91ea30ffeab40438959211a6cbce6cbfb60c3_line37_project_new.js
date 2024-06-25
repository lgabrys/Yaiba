var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
var ProjectSchema = new Schema({
	donateMethods: {
		gittip: {type: String, trim: true},
		paypal: {type: String, trim: true},
		flattr: {type: String, trim: true},
		other: {type: String, trim: true},
		emailMe: { type: String, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, trim: true },
	}
})
