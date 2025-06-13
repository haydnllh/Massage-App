const { Router } = require("express");
const {
  getUserBookings,
  addBooking,
  removeBookings,
} = require("../controllers/bookingController");

router = Router();

router.get("/:user_id", getUserBookings);
router.post("/:user_id", addBooking);
router.delete("/:user_id", removeBookings)

module.exports = router;
