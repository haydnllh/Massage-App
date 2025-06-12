const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./config/pool");
const { errorHandler } = require("./middleware/errorHandler");

const port = process.env.PORT || 5000;

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
