import { useDispatch } from "react-redux";
import api from "../api/axios";
import { setCart } from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  if (!item) return null;

  const handleIncrease = async () => {
    const res = await api.put(`/cart/${item.id}`, {
      quantity: item.quantity + 1
    });
    dispatch(setCart(res.data));
  };

  const handleDecrease = async () => {
    if (item.quantity > 1) {
      const res = await api.put(`/cart/${item.id}`, {
        quantity: item.quantity - 1
      });
      dispatch(setCart(res.data));
    }
  };

  const handleRemove = async () => {
    const res = await api.delete(`/cart/${item.id}`);
    dispatch(setCart(res.data));
  };

  return (
    <div className="border p-4 flex justify-between items-center mb-2 rounded-lg shadow-sm">

      <div>
        <h2 className="font-bold">{item.title}</h2>
        <p>₹ {item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={handleDecrease} className="px-2 bg-gray-300">-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrease} className="px-2 bg-gray-300">+</button>
      </div>

      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-3 py-1"
      >
        Remove
      </button>
    </div>
  );
}