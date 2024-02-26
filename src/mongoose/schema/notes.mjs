// const mongoose = require('mongoose');
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const NotesSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'users'},
    message: String,
},
    { timestamps: true }
);

export const Notes = mongoose.model('notes', NotesSchema);