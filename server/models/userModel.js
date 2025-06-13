const pool = require("../config/pool");

const User = {
  async register({first_name, last_name, email, password_hash}) {
    return await pool.query(
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, email, password_hash]
    );
  },

  async getAll() {
    return await pool.query("SELECT * FROM users");
  },

  async update(userId, newUser) {
    const { first_name, last_name, email, password_hash } = newUser;
    const updates = [];
    const values = [];
    let index = 1;

    if (first_name && last_name) {
      updates.push(`first_name = $${index++}, last_name = $${index++}`);
      values.push(first_name, last_name);
    }

    if (email) {
      updates.push(`email = $${index++}`);
      values.push(email);
    }

    if (password_hash) {
      updates.push(`password_hash = $${index++}`);
      values.push(password_hash);
    }

    if (updates.length === 0) return null;

    const query = `
    UPDATE users
    SET ${updates.join(", ")}
    WHERE user_id = ${userId}
  `;

    const result = await pool.query(query, values);

    return result;
  },

  async delete(userId) {
    return await pool.query("DELETE FROM users where user_id = ($1)", [userId]);
  },
};

module.exports = User;
