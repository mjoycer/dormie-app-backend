const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserBillsSchema = new Schema({
    name: String,
    email: String,
    password: String,
    room: {
        type: Schema.Types.String, 
        ref: 'rooms'
    },
    role: {
        type: String,  
        enum: ['landlord', 'leader', 'user'],
        default: 'user'
    },
    bills: Array
});

module.exports = mongoose.model('user-bills', UserBillsSchema);