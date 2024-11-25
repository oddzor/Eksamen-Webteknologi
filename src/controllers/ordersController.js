// Logic and error handling for orders related requests.

const orderModel = require("../models/orderModel");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { customerName, items } = req.body;
      const orderId = await orderModel.createOrder(customerName);
      await Promise.all(
        items.map((item) =>
          orderModel.addOrderItem(orderId, item.productId, item.quantity)
        )
      );

      res.status(201).json({ message: "Order created successfully", orderId });
    } catch (err) {
      console.error("Order Creation Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await orderModel.getAllOrders();
      res.status(200).json(orders);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderModel.getOrderById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (err) {
      console.error("Fetch Order Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await orderModel.updateOrderStatus(id, status);

      if (!updated) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.status(200).json({ message: "Order status updated successfully" });
    } catch (err) {
      console.error("Update Order Status Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await orderModel.deleteOrder(id);

      if (!deleted) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      console.error("Delete Order Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = orderController;