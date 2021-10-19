const mongoose = require('mongoose');
const users = require('./users');

const Schema = mongoose.Schema;
const ChoresSchema = new Schema({
    name:  String,
    status: {type: String, default: "Pending"},
    deadline: Date,
    users: [{type: Schema.Types.ObjectId, ref: users}]
});

module.exports = mongoose.model('chores', ChoresSchema);