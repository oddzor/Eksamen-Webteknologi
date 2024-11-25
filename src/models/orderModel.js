// Logic for structuring SQL queries and joining of tables related to orders

const db = require('../utils/db');

const orderModel = {
  createOrder: async (customerName) => {
    const [result] = await db.query(
      'INSERT INTO orders (customerName, totalAmount, status) VALUES (?, 0, "Pending")',
      [customerName]
    );
    return result.insertId;
  },
  addOrderItem: async (orderId, productId, quantity) => {
    const [result] = await db.query(
      'INSERT INTO order_items (orderId, productId, quantity) VALUES (?, ?, ?)',
      [orderId, productId, quantity]
    );
    return result.insertId;
  },
  getAllOrders: async () => {
    const [orders] = await db.query(
      `SELECT o.id AS orderId, o.customerName, o.totalAmount, o.status, 
              oi.productId, oi.quantity 
       FROM orders o 
       LEFT JOIN order_items oi ON o.id = oi.orderId`
    );

    const groupedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find((o) => o.orderId === order.orderId);
      if (existingOrder) {
        existingOrder.items.push({
          productId: order.productId,
          quantity: order.quantity,
        });
      } else {
        acc.push({
          orderId: order.orderId,
          customerName: order.customerName,
          totalAmount: order.totalAmount,
          status: order.status,
          items: order.productId
            ? [{ productId: order.productId, quantity: order.quantity }]
            : [],
        });
      }
      return acc;
    }, []);

    return groupedOrders;
  },
  getOrderById: async (id) => {
    const [orders] = await db.query(
      `SELECT o.id AS orderId, o.customerName, o.totalAmount, o.status, 
              oi.productId, oi.quantity 
       FROM orders o 
       LEFT JOIN order_items oi ON o.id = oi.orderId 
       WHERE o.id = ?`,
      [id]
    );
    if (orders.length === 0) {
      return null;
    }

    return {
      orderId: orders[0].orderId,
      customerName: orders[0].customerName,
      totalAmount: orders[0].totalAmount,
      status: orders[0].status,
      items: orders.map((order) => ({
        productId: order.productId,
        quantity: order.quantity,
      })),
    };
  },
  updateOrderStatus: async (id, status) => {
    const [result] = await db.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  },
  deleteOrder: async (id) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction(); 
        await connection.query("DELETE FROM order_items WHERE orderId = ?", [id]);
      const [result] = await connection.query("DELETE FROM orders WHERE id = ?", [id]);
  
      await connection.commit();
      return result.affectedRows > 0;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  },
};

module.exports = orderModel;