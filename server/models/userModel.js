const pool = require("../config/pool");

const User = {
  async register(username) {
    return await pool.query(
      "INSERT INTO users (username) VALUES ($1) RETURNING *",
      [username]
    );
  },

  async getAll() {
    return await pool.query("SELECT * FROM users");
  },

  async update(oldUserId, newUser) {
    return await pool.query(
      "UPDATE users SET username = ($1) WHERE id = ($2)",
      [newUser, oldUserId]
    );
  },
};

module.exports = User;
