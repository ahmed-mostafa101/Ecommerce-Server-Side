const Product = require('../models/productModel');
const OrdersList = require('../models/ordersModel');
const Cart = require('../models/cartModel');

exports.getOrders = async (req, res) => {
  try {
    let ordersList = await OrdersList.findById(req.user.id);

    if (!ordersList) {
      ordersList = new OrdersList;
      return res.status(200).json({ ordersList }); 
    }

    res.status(200).json({ ordersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addOrder = async (req, res) => {
  const { customerData } = req.body;

  try {
    const userId = req.user.id;
    let cart = await Cart.findById(userId);
    let ordersList = await OrdersList.findById(userId);

    if (!ordersList) {
      ordersList = new OrdersList({ _id: userId, orders: [], total: 0});
    }

    const order = { 
      customerData,
      products: cart.products,          
      savings: cart.savings,
      totalCost: cart.originalCost - cart.savings
    };

    ordersList.orders.push(order);
    ordersList.total =  ordersList.orders.length;

    await ordersList.save();

    await Cart.findByIdAndDelete(userId);

    res.status(201).json({ message: 'Order has been sent successfully.'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};