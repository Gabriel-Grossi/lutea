import { Schema, model } from 'mongoose';

const MongooseSchema = Schema;

const ProductSchema = new MongooseSchema({
  title: String,
  description: String,
  price: Number
});

const ProductModel = model('products', ProductSchema);

export default ProductModel