import mongoose from 'mongoose';
import { Users } from './users.mjs';

// const mongoose = require('mongoose');
// const users = require('./users');

const Schema = mongoose.Schema;
const ChoresSchema = new Schema({
    name:  String,
    status: {type: Schema.Types.String, default: "Pending"},
    deadline: Date,
    users: [{type: Schema.Types.ObjectId, ref: Users}]
});

export const Chores = mongoose.model('chores', ChoresSchema);