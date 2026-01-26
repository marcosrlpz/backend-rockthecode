const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  description: {
    type: String,
    trim: true
  },

  category: {
    type: String,
    default: 'general'
  },

  image: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
