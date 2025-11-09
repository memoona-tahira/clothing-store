import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';  

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products`);
    setProducts(response.data.products);
  };

  return (
    <div>
      <h2>Products Management</h2>
      <table className="products-list-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="products-list-image"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price} kr</td>
              <td>{product.categoryId?.name || 'N/A'}</td>
              <td>
                <button className="products-list-edit-btn">Edit</button>
                <button className="products-list-delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;