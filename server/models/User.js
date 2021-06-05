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
    },
    databases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Database',
        required: true,
        default: [],
    }]
})

module.exports = mongoose.model('User', User);