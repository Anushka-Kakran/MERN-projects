import Product from "../models/Product.js";

// GET ALL
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

// GET ONE
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
};