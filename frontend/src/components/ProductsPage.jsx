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
      try {
        let url = `${API_BASE_URL}/api/v1/products`;
        
        if (catValue) {
          url += `?category=${catValue}`;
        }
        
        console.log("Fetching products from:", url);
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
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