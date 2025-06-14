const { Router } = require("express");
const { auth } = require("../middleware/auth")

const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", auth, getUsers);

router.post("/", registerUser);

router.put("/:user_id", auth, updateUser);

router.delete("/:user_id", auth, deleteUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

module.exports = router;
