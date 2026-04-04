import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.id.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        id: product._id,
        title: product.title,
        price: product.price,
        quantity: 1
      });
    }

    await cart.save();

    res.send(cart.items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    res.send(cart?.items || []);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ UPDATE QUANTITY
export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    const item = cart.items.find(
      (i) => i.id.toString() === req.params.id
    );

    if (item) {
      item.quantity = req.body.quantity;
    }

    await cart.save();

    res.send(cart.items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ DELETE ITEM
export const deleteCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    cart.items = cart.items.filter(
      (item) => item.id.toString() !== req.params.id
    );

    await cart.save();

    res.send(cart.items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};