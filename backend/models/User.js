const { Schema, model } = require('mongoose')

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = model( 'Users', userSchema )