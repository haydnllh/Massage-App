const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const dayjs = require("dayjs");
const sendConfirmation = require("../config/email");

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

const getAllBookings = async (req, res, next) => {
  try {
    const result = await Booking.getAllBookings();
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

const getAllBookingByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    const result = await Booking.getBookingByDate(date);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

const getBookingList = async (req, res, next) => {
  try {
    const result = await Booking.getBookingList();
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

//Adding bookings
const addBooking = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const bookings = { user_id, ...req.body };

    const result = await Booking.add(bookings);
    console.log(bookings)

    if (result) {
      res.status(201).json(result);

      const user_result = await User.getFromId(user_id);
      const user = user_result.rows[0];
      const email_result = await sendConfirmation(user, bookings);
      console.log(email_result);
    } else {
      result.status(400).json({ message: "Porblem when booking" });
    }
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
  getAllBookings,
  getAllBookingByDate,
  getBookingList,
  addBooking,
  removeBookings,
};
