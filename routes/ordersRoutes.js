const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ordersController = require('../controllers/ordersControllers');

router.get('/', auth, ordersController.getOrders);
router.post('/add', auth, ordersController.addOrder);

module.exports = router;