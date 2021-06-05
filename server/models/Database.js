const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Database type is required'],
    },
    name: {
        type: String,
        required: [true, 'Database name is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

module.exports = mongoose.model('Database', Database);