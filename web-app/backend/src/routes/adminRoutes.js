const express = require("express");
const router = express.Router();

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  }
);

module.exports = router;