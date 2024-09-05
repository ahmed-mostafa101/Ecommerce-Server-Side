const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 30;
    const skip = parseInt(req.query.skip) || 0;
    const sortBy = req.query.sortBy || '_id';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; 

    const categoryName = req.query.categoryName;
    const searchKey = req.query.searchKey;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    const query = {};

    if (!isNaN(minPrice)) {
      query.price = { ...query.price, $gte: minPrice }; 
    }
    if (!isNaN(maxPrice)) {
      query.price = { ...query.price, $lte: maxPrice }
    }
    if (categoryName) {
      query.category = categoryName;
    }
    if (searchKey) {
      query.description = new RegExp(searchKey, 'i');
    }

    const total = await Product.countDocuments(query);

    if (total - skip <= 0) {
      limit = 0;
    } else {
      limit = Math.min(total - skip, limit);
    }

    let filtered = false;
    if (req.query.sortBy || req.query.searchKey || req.query.categoryName || req.query.minPrice || req.query.maxPrice) {
      filtered = true;
    }

    const products = await Product.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      products,
      total,
      limit,
      skip,
      filtered
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryList = async (req, res) => {
  try {
    const categories = await Product.distinct('category'); 
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getBestSellers = async (req, res) => {
  try {
    const limit = 20;  

    const bestSellers = await Product.find()
      .sort({ salesCount: -1 })
      .limit(limit);

    res.status(200).json({ bestSellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

