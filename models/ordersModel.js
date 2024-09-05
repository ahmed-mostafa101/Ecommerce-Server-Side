const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
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

const orderSchema = new mongoose.Schema({
  products: {
    type: [orderProductSchema], 
    require: true,
  },
  totalCost: {
    type: Number,
    required: true
  },
  savings: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Pending"
  },
  customerData: {
    address: {
      country: String,
      city: String,
      street: String,
      postCode: String
    },
    name: String,
    phone: String
  }
}, { versionKey: false });

const ordersListSchema = new mongoose.Schema({
  orders: [orderSchema],
  total: Number
}, {versionKey: false});

const OrdersList = mongoose.model('OrdersList', ordersListSchema);
module.exports = OrdersList;
