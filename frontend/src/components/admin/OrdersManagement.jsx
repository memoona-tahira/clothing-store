import { useState, useEffect } from 'react';
import axios from 'axios';

function OrdersManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/orders/admin/all');
    setOrders(response.data.orders);
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/orders/${orderId}/status`, {
        status: newStatus
      });
      fetchOrders();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <h2>Orders Management</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="orders-mgmt-order-card">
            <div className="orders-mgmt-header">
              <div>
                <h3>Order #{order.orderNumber}</h3>
                <p><strong>Customer:</strong> {order.userId?.name} ({order.userId?.email})</p>
                <p><strong>Total:</strong> {order.totalAmount} kr</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                
                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="orders-mgmt-shipping">
                    <strong>Ship To:</strong>
                    <div className="orders-mgmt-shipping-details">
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.postalCode} {order.shippingAddress.city}<br />
                      {order.shippingAddress.country}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="orders-mgmt-status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <h4>Items:</h4>
            {order.items.map((item, idx) => (
              <div key={idx} className="orders-mgmt-items">
                • {item.name} - Size: {item.sizeValue}, Color: {item.color}, Qty: {item.quantity} - {item.price} kr
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersManagement;