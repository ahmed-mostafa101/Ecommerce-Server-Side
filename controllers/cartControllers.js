const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findById(req.user.id);

    if (!cart) {
      cart = new Cart;
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; 
    
    const cartId = req.user.id;
    let cart = await Cart.findById(cartId);

    if (!cart) {
      cart = new Cart({ _id: cartId, products: [] });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const existingProduct = cart.products.find(p => p.id === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: quantity,
        thumbnail: product.thumbnail,
        discountPercentage: product.discountPercentage
      });
    }

    cart.shippingCost = 0;
    cart.originalCost = 0;
    cart.savings = 0;
    cart.totalQuantity = 0;
    cart.totalProducts = cart.products.length;

    for (p of cart.products) {
      cart.totalQuantity += p.quantity;
      cart.originalCost += p.price * p.quantity;
      cart.savings += (p.discountPercentage / 100) * p.price * p.quantity;
    }

    cart.totalCost = cart.originalCost - cart.savings + cart.shippingCost;

    await cart.save();

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteFromCart = async (req, res) => {
  let { productId, quantity, remove } = req.query;
  quantity = parseInt(quantity);
  remove = (remove === 'true');

  try {
    let cart = await Cart.findById(req.user.id);

    if (remove || quantity === 1) {
      cart.products = cart.products.filter(item => item.id !== productId);
    } else {
      for (p of cart.products) {
        if (p.id === productId) {
          p.quantity--;
          break;
        }
      }
    }

    cart.shippingCost = 0;
    cart.originalCost = 0;
    cart.savings = 0;
    cart.totalQuantity = 0;
    cart.totalProducts = cart.products.length;

    for (p of cart.products) {
      cart.totalQuantity += p.quantity;
      cart.originalCost += p.price * p.quantity;
      cart.savings += (p.discountPercentage / 100) * p.price * p.quantity;
    }

    cart.totalCost = cart.originalCost - cart.savings + cart.shippingCost;

    await cart.save();
    
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
