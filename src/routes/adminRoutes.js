const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuthorization = require('../utils/adminAuthorization');
const productController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', adminAuthorization, productController.createProduct);
router.get('/products', adminAuthorization, adminController.getAllProducts);
router.put('/products/:id', adminAuthorization, adminController.updateProduct);
router.get('/orders', adminAuthorization, adminController.getAllOrders);
router.put('/orders/:id', adminAuthorization, adminController.updateOrderStatus);

router.get('/test', adminAuthorization, (req, res) => {
    res.status(200).json({ message: 'Admin access verified', user: req.user });
  });  // Test routing used for troubleshooting token access

module.exports = router;