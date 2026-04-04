import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // 🧮 Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleOrder() {
    if (!name || !address) {
      alert("Please fill all details");
      return;
    }

    alert("Order placed successfully 🎉");
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-6 grid md:grid-cols-2 gap-6">

        {/* LEFT: FORM */}
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border p-2 mb-3 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Enter your address"
            className="w-full border p-2 mb-3 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={handleOrder}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
          >
            Place Order
          </button>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <div className="space-y-3">

              {cart.map((product) => (
                <div key={product._id} className="flex justify-between border-b pb-2">
                  <span>
                    {product.title} × {product.quantity}
                  </span>
                  <span>${product.price * product.quantity}</span>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between font-bold mt-4 text-lg">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}