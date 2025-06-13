const Booking = require("../models/bookingModel");

//Get bookings by user id
const getUserBookings = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const result = await Booking.getUserBookings(user_id);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

//Adding bookings
const addBooking = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const booking = { user_id, ...req.body };

    const result = await Booking.add(booking);

    result.rowCount === 1
      ? res.status(201).json({ message: "Booking confirmed" })
      : res.status(400).json({ message: "Problem when booking" });
  } catch (err) {
    next(err);
  }
};

//Removing bookings, can remove multiple at the same time
const removeBookings = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { booking_ids } = req.body;

    const result = await Booking.removeBookings(user_id, booking_ids);
    result.rowCount === booking_ids.length
      ? res.status(201).json(result)
      : res.status(400).json({ message: "Cannot find booking ids" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserBookings,
  addBooking,
  removeBookings,
};
