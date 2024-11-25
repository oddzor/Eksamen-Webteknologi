const db = require("../utils/db");

const userModel = {
  getUserByUsername: async (username) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  },

  createUser: async (username, password, role) => {
    const [result] = await db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, password, role]
    );
    return result.insertId;
  },
};

module.exports = userModel;
