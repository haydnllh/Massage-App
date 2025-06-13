const User = require("../models/userModel");

//Get all users
const getUsers = async (req, res, next) => {
  try {
    const result = await User.getAll();
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

//Register user
const registerUser = async (req, res, next) => {
  try {
    const result = await User.register(req.body);

    if (!(result.rowCount === 1)) {
      return res.status(400).json({ message: "Problem when registering user" });
    }

    res.status(201).json({ message: "User registered", user: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

//Update user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await User.update(id, req.body);

    if (!(result.rowCount === 1)) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User updated" });
  } catch (err) {
    next(err);
  }
};

//Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await User.delete(id);

    if (!(result.rowCount === 1)) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
};
