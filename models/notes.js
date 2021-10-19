const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NotesSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'users'},
    message: String,
},
    { timestamps: true }
);

module.exports = mongoose.model('notes', NotesSchema);