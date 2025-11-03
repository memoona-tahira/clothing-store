import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'orders');
  const [orders, setOrders] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/products?cat=Men');
      return;
    }
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'cards') fetchCards();
  }, [isAuthenticated, navigate, activeTab, user]);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/orders/user/${user.id}`);
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const fetchCards = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cards/user/${user.id}`);
      setCards(response.data.cards);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  const deleteCard = async (cardId) => {
    if (window.confirm('Delete this card?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/cards/${cardId}`);
        fetchCards();
      } catch (error) {
        alert('Failed to delete card');
      }
    }
  };

  const setDefaultCard = async (cardId) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/cards/${cardId}/default`);
      fetchCards();
    } catch (error) {
      alert('Failed to set default card');
    }
  };

  const getStatusClass = (status) => {
    if (status === 'delivered') return 'order-status-delivered';
    if (status === 'cancelled') return 'order-status-cancelled';
    return 'order-status-other';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-tabs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`profile-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
        >
          My Orders
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`profile-tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
        >
          Saved Cards
        </button>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2>Order History</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.orderNumber}</h3>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Total: {order.totalAmount} kr</p>
                  </div>
                  <div>
                    <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <h4>Items:</h4>
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      • {item.name} - Size: {item.sizeValue}, Color: {item.color}, Qty: {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'cards' && (
        <div>
          <h2>Saved Payment Methods</h2>
          {cards.length === 0 ? (
            <p>No saved cards</p>
          ) : (
            cards.map(card => (
              <div key={card._id} className="card-item">
                <div>
                  <strong>{card.cardType}</strong> ending in {card.lastFourDigits}
                  <br />
                  Expires: {card.expiryMonth}/{card.expiryYear}
                  {card.isDefault && <span className="checkout-default-badge">✓ Default</span>}
                </div>
                <div>
                  {!card.isDefault && (
                    <button
                      onClick={() => setDefaultCard(card._id)}
                      className="card-set-default-btn"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteCard(card._id)}
                    className="card-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;