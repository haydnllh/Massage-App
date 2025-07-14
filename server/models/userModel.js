const pool = require("../config/pool");
const bcrypt = require("bcryptjs");

const User = {
  async register({ first_name, last_name, email, password, isAdmin }) {
    const password_hash = hash(password);

    return await pool.query(
      "INSERT INTO users (first_name, last_name, email, password_hash, isAdmin) VALUES ($1, $2, $3, $4, $5)",
      [first_name, last_name, email, password_hash, isAdmin]
    );
  },

  async getAll() {
    return await pool.query("SELECT * FROM users");
  },

  async getFromId(user_id) {
    return await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
  },

  async update(user_id, newUser) {
    const { first_name, last_name, email, password, isAdmin } = newUser;
    const updates = [];
    const values = [];
    let index = 1;

    if (first_name) {
      updates.push(`first_name = $${index++}`);
      values.push(first_name);
    }

    if (last_name) {
      updates.push(`last_name = $${index++}`);
      values.push(last_name);
    }

    if (email) {
      updates.push(`email = $${index++}`);
      values.push(email);
    }

    if (password) {
      const password_hash = hash(password);
      updates.push(`password_hash = $${index++}`);
      values.push(password_hash);
    }

    if (isAdmin) {
      updates.push(`isAdmin = $${index++}`);
      values.push(isAdmin);
    }

    if (updates.length === 0) return null;

    const query = `
    UPDATE users
    SET ${updates.join(", ")}
    WHERE user_id = ${user_id}
    RETURNING *
  `;

    const result = await pool.query(query, values);

    return result;
  },

  async delete(user_id) {
    return await pool.query("DELETE FROM users where user_id = ($1)", [
      user_id,
    ]);
  },

  async login(email, password) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password_hash);

    return isMatch ? user : null;
  },
};

function hash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

module.exports = User;
