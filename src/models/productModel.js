const db = require('../utils/db');

const productModel = {
  getAllProducts: async () => {
    const [products] = await db.query('SELECT * FROM products');
    return products;
  },

  getProductById: async (id) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  createProduct: async (name, description, price, stock) => {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    return result.insertId;
  },

  updateProduct: async (id, name, description, price, stock) => {
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
      [name, description, price, stock, id]
    );
    return result.affectedRows;
  },

  deleteProduct: async (id) => {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

module.exports = productModel;