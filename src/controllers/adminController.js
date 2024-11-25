// Logic and error handling for admin protected requests.

const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');


createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const result = await productModel.createProduct({ name, description, price, stock });
    res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const adminController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productModel.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      console.error('Admin Get Products Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;
      const updated = await productModel.updateProduct(id, name, description, price, stock);
      if (!updated) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
      console.error('Admin Update Product Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderModel.getAllOrders();
      res.status(200).json(orders);
    } catch (err) {
      console.error('Admin Get Orders Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await orderModel.updateOrderStatus(id, status);
      if (!updated) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order status updated successfully' });
    } catch (err) {
      console.error('Admin Update Order Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = adminController;