const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RoomSchema = new Schema({
    roomCode: String,
    password: String
});

module.exports = mongoose.model('rooms', RoomSchema);