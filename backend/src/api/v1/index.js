const express = require("express");
const userRoutes = require("./routes/user.route");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to API v1");
});

router.use("/users", userRoutes);

module.exports = router;