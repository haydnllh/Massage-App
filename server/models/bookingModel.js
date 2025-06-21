const pool = require("../config/pool");
const BookingStatus = require("../config/bookingStatus");

const Booking = {
  async getUserBookings(user_Id) {
    return await pool.query(
      `SELECT * FROM bookings WHERE user_id = ${user_Id}`
    );
  },

  async add({ user_id, item_id, booking_date, start_time, end_time }) {
    const time = new Date();

    const result = await pool.query(
      "INSERT INTO bookings (user_id, item_id, booking_date, start_time, end_time, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        user_id,
        item_id,
        booking_date,
        start_time,
        end_time,
        BookingStatus.CONFIRMED,
        time,
        time,
      ]
    );

    const booking = result.rows[0];

    return booking ? booking : null;
  },

  async removeBookings(userId, bookingIds) {
    return await pool.query(
      "DELETE FROM bookings WHERE booking_id = ANY($1) AND user_id = $2",
      [bookingIds, userId]
    );
  },
};

module.exports = Booking;
