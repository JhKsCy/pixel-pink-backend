const { Schema, model } = require('mongoose')

const userDataSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    addres: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    observations: {
        type: String
    }
})

module.exports = model( 'UserDatas', userDataSchema )