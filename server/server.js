const dotenv = require("dotenv").config();
const express = require('express');
const app = express();
const pool = require("./db/pool")

const port = process.env.PORT || 5000

pool.query("SELECT 1")
    .then(() => console.log("Connected to db"))
    .catch(err => console.log("Db connection error", err));

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
