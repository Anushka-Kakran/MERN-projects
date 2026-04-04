import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice"; // Change this import
import { Link } from "react-router-dom";
import api from "../api/axios"; // Import your axios instance

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      // 1. Tell the Backend to add the item
      const res = await api.post("/cart", { productId: product._id });
      
      // 2. Update Redux with the actual items returned by the server
      // This ensures your frontend matches your database exactly
      dispatch(setCart(res.data)); 
      
      alert("Added to cart! 🛒");
    } catch (err) {
      console.error("Failed to add to cart", err);
      alert("Please login to add items to cart");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-2xl transition p-4 hover:-translate-y-1">
      <img src={product.image} className="h-44 w-full object-cover rounded-lg" alt={product.title} />
      <h2 className="mt-2 font-semibold text-gray-800 line-clamp-1">{product.title}</h2>
      <p className="text-green-600 font-bold text-lg">${product.price}</p>

      <div className="flex justify-between mt-3">
        <Link to={`/product/${product._id}`} className="text-blue-500 text-sm">
          View Details
        </Link>

        <button
          onClick={handleAdd} // Use the new function
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}