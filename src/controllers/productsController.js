const productModel = require("../models/productModel");

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await productModel.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      console.error("Fetch Products Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productModel.getProductById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      console.error("Fetch Product Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, description, price, stock } = req.body;
      const productId = await productModel.createProduct(name, description, price, stock);
      res
        .status(201)
        .json({ message: "Product created successfully", productId });
    } catch (err) {
      console.error("Create Product Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;
      const updated = await productModel.updateProduct(id, name, description, price, stock);

      if (!updated) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
      console.error("Update Product Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await productModel.deleteProduct(id);

      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error("Delete Product Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = productController;
