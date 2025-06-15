const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { auth } = require("./middleware/auth");
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", auth);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
