const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
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
    }
});

module.exports = mongoose.model('users', UsersSchema);