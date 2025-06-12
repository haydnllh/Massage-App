const { Router } = require("express");
const { getUsers, registerUser, updateUser } = require("../controllers/userController");

const router = Router();

router.get("/", getUsers);

router.post("/", registerUser);

router.post("/:id", updateUser)

module.exports = router;
