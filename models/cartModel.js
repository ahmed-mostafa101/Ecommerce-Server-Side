const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
  id: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    require: true
  },
  quantity: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
}, { _id: false, versionKey: false }); 


const cartSchema = new mongoose.Schema({
  products: [cartProductSchema], 
  originalCost: {
    type: Number,
    default: 0
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  savings: {
    type: Number,
    default: 0
  },
  totalProducts: {
    type: Number,
    default: 0
  },
  totalQuantity: {
    type: Number,
    default: 0
  },
  totalCost: {
    type: Number,
    default: 0
  }
}, { versionKey: false });


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;


