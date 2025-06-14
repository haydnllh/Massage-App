const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not authorised" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.getFromId(data.user_id);

    if (!(user.rowCount === 1)) {
      return res.status(400).json({ message: "Invalid user" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Not authroised" });
  }
};

module.exports = {
  auth,
};
