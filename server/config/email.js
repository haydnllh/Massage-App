const nodemailer = require("nodemailer");
const ItemNames = require("./items")

async function sendConfirmation(user, bookings) {
  const { bookingsList } = bookings;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const formattedBookings = bookingsList
    .map((b) => {
      return `
        <li>
            <strong>Date:</strong> ${b.booking_date}<br/>
            <strong>Time:</strong> ${b.start_time} - ${b.end_time}<br/>
            <strong>Service:</strong> ${ItemNames[b.item_id]}
        </li>
    `;
    })
    .join("");

  const body = `
    <div style="font-family: Arial, sans-serif;">
        Hi ${user.first_name}, <br/>
        <p>Your appointment has been confirmed with <strong>Willow Wellness and Sports Therapy</strong>.</p>

        <ul>
            ${formattedBookings}
        </ul>

        <p>If you have any questions, feel free to reply to this email or contact us directly.</p>

        <p>We look forward to seeing you!</p>
        <p>— Willow Wellness and Sports Therapy</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject:
      "Confirmation for booking with Willow Wellnesss and Sports Therapy",
    html: body,
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = sendConfirmation;
