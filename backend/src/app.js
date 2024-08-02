/* -----> Third Party Packages <----- */
const express = require("express");
const path = require("path");
const cors = require("cors");

/* -----> Routes <----- */
const v1Routes = require("./api/v1");

/* -----> Create express Instance <----- */
const app = express();

/* -----> Middlewares <----- */
app.use(express.json()); // Handle JSON data
app.use(cors()); // CORS

/* -----> Routes <----- */
// 00 Test
app.get("/", async (req, res) => {
  console.log("Welcome to API app");
  res.send("Welcome to API app");
});

app.use("/api/v1", v1Routes);

module.exports = app;