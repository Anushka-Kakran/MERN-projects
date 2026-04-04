import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
import Product from "./models/Product.js";

// ✅ load env variables
dotenv.config();

async function seedData() {
  try {
    // ✅ use MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // fetch dummy data
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    // format data
    const products = data.products.map((p) => ({
      title: p.title,
      price: p.price,
      description: p.description,
      image: p.thumbnail,
      brand: p.brand,
      category: p.category
    }));

    // clear old data
    await Product.deleteMany();

    // insert new data
    await Product.insertMany(products);

    console.log("Products Inserted Successfully 🎉");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedData();