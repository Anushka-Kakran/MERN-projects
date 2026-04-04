import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      title: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

export default mongoose.model("Cart", cartSchema);