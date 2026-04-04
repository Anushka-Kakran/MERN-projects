import express from "express";
import { register, login, getUserProfile } from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// This route is protected - only logged-in users can see their profile
router.get("/me", verifyToken, getUserProfile);

export default router;