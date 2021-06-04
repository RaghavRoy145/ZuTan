const mongoose = require('mongoose');

const User = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Database type is required'],
    },
    name: {
        type: String,
        required: [true, 'Database name is required'],
    },
})

module.exports = mongoose.model('Database', Database);