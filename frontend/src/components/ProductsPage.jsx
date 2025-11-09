import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductsOverview from './ProductsOverview';
import axios from 'axios'; 
import API_BASE_URL from '../config/api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const catValue = searchParams.get('cat');

  useEffect(() => {
    const fetchProducts = async () => {
      if (catValue !== null) {
        const response = await axios.get(`${API_BASE_URL}/api/v1/products?catagory=${catValue}`);
        setProducts(response.data.products);
      } else {
        console.log("all products?");
        const response = await axios.get(`${API_BASE_URL}/api/v1/products`);
        setProducts(response.data.products);
      }
    };
    fetchProducts();
  }, [catValue]);

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductsOverview key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
