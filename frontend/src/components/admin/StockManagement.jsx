import { useState, useEffect } from 'react';
import axios from 'axios';

function StockManagement() {
  const [stocks, setStocks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    sizeId: '',
    color: '',
    quantity: 0
  });

  useEffect(() => {
    fetchStocks();
    fetchProducts();
    fetchSizes();
  }, []);

  const fetchStocks = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/stock/admin/all');
    setStocks(response.data.stocks);
  };

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/products');
    setProducts(response.data.products);
  };

  const fetchSizes = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/sizes');
    setSizes(response.data.sizes);
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/stock', formData);
      setShowAddForm(false);
      fetchStocks();
      setFormData({ productId: '', sizeId: '', color: '', quantity: 0 });
    } catch (error) {
      alert('Failed to add stock');
    }
  };

  return (
    <div>
      <div className="stock-mgmt-header">
        <h2>Stock Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="stock-mgmt-add-btn"
        >
          {showAddForm ? 'Cancel' : '+ Add Stock'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddStock} className="stock-mgmt-form">
          <h3>Add Stock</h3>
          <div className="stock-mgmt-form-grid">
            <select
              value={formData.productId}
              onChange={(e) => setFormData({...formData, productId: e.target.value})}
              required
              className="stock-mgmt-form-select"
            >
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>

            <select
              value={formData.sizeId}
              onChange={(e) => setFormData({...formData, sizeId: e.target.value})}
              required
              className="stock-mgmt-form-select"
            >
              <option value="">Select Size</option>
              {sizes.map(s => (
                <option key={s._id} value={s._id}>{s.value}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Color"
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
              required
              className="stock-mgmt-form-input"
            />

            <input
              type="number"
              placeholder="Quantity to add"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
              required
              min="1"
              className="stock-mgmt-form-input"
            />

            <button type="submit" className="stock-mgmt-form-submit">
              Add Stock
            </button>
          </div>
        </form>
      )}

      <table className="stock-mgmt-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock._id}>
              <td>{stock.productId?.name}</td>
              <td>{stock.sizeId?.value}</td>
              <td>{stock.color}</td>
              <td className="stock-mgmt-quantity">
                {stock.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockManagement;