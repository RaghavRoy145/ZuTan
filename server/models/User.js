const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
})

module.exports = mongoose.model('User', User);