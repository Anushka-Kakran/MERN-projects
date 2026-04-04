import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { setCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await api.get("/cart");
        dispatch(setCart(res.data));
      } catch (err) {
        console.log("Cart Error:", err);
      }
    }

    fetchCart();
  }, [dispatch]);

  if (!cart || cart.length === 0) {
    return <h1 className="text-center mt-10">🛒 Cart is empty</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}