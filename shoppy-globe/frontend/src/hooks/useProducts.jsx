import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products"); // ✅ backend
        setProducts(res.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProducts();
  }, []);

  return { products, error };
}