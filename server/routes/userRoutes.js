const { Router } = require("express");
const { getUsers, registerUser, updateUser, deleteUser } = require("../controllers/userController");

const router = Router();

router.get("/", getUsers);

router.post("/", registerUser);

router.post("/:id", updateUser)

router.delete("/:id", deleteUser)

module.exports = router;
