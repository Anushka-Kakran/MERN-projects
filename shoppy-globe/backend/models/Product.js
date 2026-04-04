import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
  brand: String,       // ✅ add
  category: String     // ✅ add
});

export default mongoose.model("Product", productSchema);