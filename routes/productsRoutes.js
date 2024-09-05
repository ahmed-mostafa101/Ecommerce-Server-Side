const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.getProducts);
router.get('/best-sellers', productsControllers.getBestSellers);
router.get('/category-list', productsControllers.getCategoryList);
router.get('/:productId', productsControllers.getProductById);


module.exports = router;