const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number
});

const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;