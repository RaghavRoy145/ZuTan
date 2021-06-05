const mongoose = require('mongoose');

const Database = new mongoose.Schema({
    type: {
        type: String,
        enum: {
            values: ['sql', 'mongo'],
            message: "Unsupported database type"
        },
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
    },
    tables: {
        type: [{
            tableName: {
                type: String,
                validator: (v) => /[a-zA-Z][a-zA-Z0-9]+/.test(v),
                message: props => `${props.value} is not a valid table name`
            },
            columns: [{
                columnName: {
                    type: String,
                    validator: (v) => /[a-zA-Z][a-zA-Z0-9]+/.test(v),
                    message: props => `${props.value} is not a valid column name`
                },
                columnType: {
                    type: String,
                    enum: {
                        values: ['INT', 'VARCHAR', 'BOOLEAN'],
                        message: 'Invalid column type'
                    }
                },
                isPrimaryKey: Boolean,
                isNotNull: Boolean
            }]
        }],
        require: true,
        default: []
    },
    address: String,
    port: Number,
})

module.exports = mongoose.model('Database', Database);