const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);

router.post('/', protect, addOrderItems);

module.exports = router;
