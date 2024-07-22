const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  sizes: [sizeSchema],
  category: {
    type: String,
    enum: ['blusas', 'faldas'],
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);