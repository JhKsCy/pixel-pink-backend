const { Schema, model } = require('mongoose')

const productSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    clotheCollection: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    imgA: {
        type: Object,
        required: true
    },
    imgB: {
        type: Object,
        required: true
    },
    imgC: {
        type: Object,
        required: true
    }
})

module.exports = model( 'Products', productSchema )