var mongoose = require('mongoose'),
    _ = require('lodash'),
    notifier = require('../utils/requests-notifications'),
    Schema = mongoose.Schema
var RequestSchema = new Schema({
})
RequestSchema.pre('save', function (next) {
    if (!this.created_at) this.created_at = new Date;
});
