const { Router } = require("express");
const {auth} = require("../middleware/auth")

const {
  getUserBookings,
  addBooking,
  removeBookings,
} = require("../controllers/bookingController");

router = Router();

router.get("/:user_id", auth, getUserBookings);
router.post("/:user_id", auth, addBooking);
router.delete("/:user_id", auth, removeBookings)

module.exports = router;
