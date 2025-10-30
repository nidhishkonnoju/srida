const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  subcategories: [{
    name: String,
    items: [{
      name: String,
      description: String,
      price: Number,
      image: String,
      vendor: String
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);