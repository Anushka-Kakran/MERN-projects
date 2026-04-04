import useProducts from '../hooks/useProducts';
import { useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem';

export default function ProductList() {
  const { products, error } = useProducts();
  const search = useSelector((state) => state.search);

  if (error) return <h1>Error: {error}</h1>;
  if (products.length === 0)
  return <h1 className="text-center mt-10">Loading products...</h1>;

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="bg-gray-100 min-h-screen p-6">

  <h1 className="text-3xl font-bold mb-6">Explore Products</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredProducts.map((product) => (
     <ProductItem key={product._id} product={product} />
    ))}
  </div>

</div>
  );
}