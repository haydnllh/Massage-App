const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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
    const { user_id } = req.params;

    const result = await User.update(user_id, req.body);

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
    const { user_id } = req.params;

    const result = await User.delete(user_id);

    if (!(result.rowCount === 1)) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

//Login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const {password_hash: userPassword, ...rest} = await User.login(email, password);

    const token = jwt.sign({ user_id: rest.user_id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    
    res.status(201).json(rest);
  } catch (err) {
    next(err);
  }
};

//Logout
const logoutUser = async(req, res, next) => {
    res.cookie("jwt", " ", {
        expiersIn: "-1"
    });
    return res.json({message: "Logged out"})
}

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
