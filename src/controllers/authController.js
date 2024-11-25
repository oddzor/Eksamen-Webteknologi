const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.getUserByUsername(username);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ token });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  register: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await UserModel.createUser(username, hashedPassword, role);

      res.status(201).json({ message: "User registered successfully", userId });
    } catch (err) {
      console.error("Register Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  logout: (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
  },
};

module.exports = authController;
