const { Schema, model } = require('mongoose')

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    imgDetail: {
        type: String,
        required: true
    },
    imgAdd: {
        type: String,
        required: false
    }
})

module.exports = model( 'Products', productSchema )