const pool = require("../config/pool");
const BookingStatus = require("../config/bookingStatus");

const Booking = {
  async getUserBookings(user_Id) {
    return await pool.query(
      `SELECT * FROM bookings WHERE user_id = ${user_Id}`
    );
  },

  async getAllBookings() {
    return await pool.query(`SELECT * FROM bookings`);
  },

  async getBookingList() {
    return await pool.query(
      "SELECT first_name, last_name, email, booking_date, item_id, start_time, end_time FROM bookings LEFT JOIN users on users.user_id = bookings.user_id"
    );
  },

  async add(bookings) {
    const time = new Date().toISOString();
    const { user_id, ...bookingsList } = bookings;

    const values = [];
    const placeholders = [];

    let i = 1;
    for (const booking of Object.values(bookingsList)) {
      const { item_id, booking_date, start_time, end_time } = booking;

      values.push(
        user_id,
        item_id,
        booking_date,
        start_time,
        end_time,
        "confirmed", // or BookingStatus.CONFIRMED if it's a string
        time,
        time
      );

      placeholders.push(
        `($${i}, $${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}, $${i + 5}, $${
          i + 6
        }, $${i + 7})`
      );

      i += 8;
    }

    const query = `
    INSERT INTO bookings (
      user_id, item_id, booking_date, start_time, end_time, status, created_at, updated_at
    )
    VALUES ${placeholders.join(", ")}
    RETURNING *;
  `;

    const result = await pool.query(query, values);

    return result.rows.length > 0 ? result.rows : null;
  },

  async removeBookings(userId, bookingIds) {
    return await pool.query(
      "DELETE FROM bookings WHERE booking_id = ANY($1) AND user_id = $2",
      [bookingIds, userId]
    );
  },
};

module.exports = Booking;
