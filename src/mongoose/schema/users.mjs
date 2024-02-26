// const mongoose = require('mongoose');

import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: mongoose.Schema.Types.String,
    room: {
        type: mongoose.Schema.Types.String, 
        ref: 'rooms'
    },
    role: {
        type: mongoose.Schema.Types.String,  
        enum: ['landlord', 'leader', 'user'],
        default: 'user'
    }
});

export const Users = mongoose.model('Users', UsersSchema);

// module.exports = mongoose.model('users', UsersSchema);