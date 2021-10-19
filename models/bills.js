const mongoose = require('mongoose');
const users = require('./users');

const Schema = mongoose.Schema;
const BillsSchema = new Schema({
    name: String,
    amount: Number,
    dueDate: Date,
    isNecessity: Boolean,
    paidUsers: [{ type: Schema.Types.ObjectId, ref: users }],
    unpaidUsers: [{ type: Schema.Types.ObjectId, ref: users }]
});

module.exports = mongoose.model('bills', BillsSchema);