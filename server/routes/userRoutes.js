const { Router } = require("express");
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const router = Router();

router.get("/", getUsers);

router.post("/", registerUser);

router.put("/:user_id", updateUser);

router.delete("/:user_id", deleteUser);

router.post("/login", loginUser)

module.exports = router;
