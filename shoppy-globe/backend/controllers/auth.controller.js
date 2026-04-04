import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).send("User exists");

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();

    res.send("User Registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Wrong password");

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET USER PROFILE (For Account Page)
export const getUserProfile = async (req, res) => {
  try {
    // req.user.id comes from the verifyToken middleware
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};