import express from "express";
import verifyToken from "../middleware/auth.js";

import {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, deleteCartItem);

export default router;