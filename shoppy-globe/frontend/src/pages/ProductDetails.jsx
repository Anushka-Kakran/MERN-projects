import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import api from "../api/axios"; // ✅ use axios instance

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // ✅ CALL YOUR BACKEND
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Loading UI
  if (loading) {
    return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
  }

  if (!product) {
    return <h1 className="text-center mt-10">Product not found</h1>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-6">

        {/* LEFT: IMAGE */}
        <div>
          <img
            src={product.image} 
            alt={product.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>

            <p className="text-green-600 text-xl font-semibold mt-2">
              ₹ {product.price}
            </p>

            <p className="text-gray-600 mt-4">
              {product.description}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Brand: {product.brand}
            </p>

            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mt-6"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}