import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: 'Sweden'
  });
  const [newCard, setNewCard] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/products?cat=Men');
      return;
    }
    fetchCards();
  }, [isAuthenticated, navigate, user]);

  const fetchCards = async () => {
    if (!user) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/cards/user/${user.id}`);
      setCards(response.data.cards);
      if (response.data.cards.length > 0) {
        setSelectedCard(response.data.cards.find(c => c.isDefault) || response.data.cards[0]);
      }
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/cards', {
        ...newCard,
        userId: user.id,
        isDefault: cards.length === 0
      });
      fetchCards();
      setShowAddCard(false);
      setNewCard({
        cardholderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        saveCard: false
      });
    } catch (error) {
      alert('Failed to add card');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedCard && !newCard.cardNumber) {
      alert('Please select or add a payment method');
      return;
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
      alert('Please fill in shipping address');
      return;
    }

    try {
      // Fetch all sizes to convert size values to IDs
      const sizesResponse = await axios.get('http://localhost:3000/api/v1/sizes');
      const sizes = sizesResponse.data.sizes;

      // If using new card and saveCard is checked, save it first
      let paymentMethod = selectedCard;
      if (!selectedCard && newCard.saveCard) {
        const cardResponse = await axios.post('http://localhost:3000/api/v1/cards', {
          ...newCard,
          userId: user.id,
          isDefault: cards.length === 0
        });
        paymentMethod = cardResponse.data.card;
      } else if (!selectedCard) {
        const firstDigit = newCard.cardNumber[0];
        let cardType = 'Visa';
        if (firstDigit === '5') cardType = 'Mastercard';
        if (firstDigit === '3') cardType = 'Amex';
        
        paymentMethod = {
          cardType,
          lastFourDigits: newCard.cardNumber.slice(-4)
        };
      }

      // Convert cart items - lookup sizeId from size value
      const orderItems = cartItems.map(item => {
        const sizeObj = sizes.find(s => s.value === item.size);
        return {
          productId: item.productId,
          name: item.name,
          price: item.price,
          sizeId: sizeObj._id,
          sizeValue: item.size,
          color: item.color,
          quantity: item.quantity,
          image: item.image
        };
      });

      // Create order
      const orderData = {
        userId: user.id,
        items: orderItems,
        totalAmount: getCartTotal(),
        shippingAddress,
        paymentMethod: {
          cardType: paymentMethod.cardType,
          lastFourDigits: paymentMethod.lastFourDigits
        }
      };

      await axios.post('http://localhost:3000/api/v1/orders', orderData);
      
      clearCart();
      alert('Order placed successfully!');
      navigate('/profile?tab=orders');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Order Summary */}
      <div className="checkout-section">
        <h2>Order Summary</h2>
        {cartItems.map((item, idx) => (
          <div key={idx}>
            {item.name} - {item.size} / {item.color} x {item.quantity} = {item.price * item.quantity} kr
          </div>
        ))}
        <div style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Total: {getCartTotal()} kr
        </div>
      </div>

      {/* Shipping Address */}
      <div className="checkout-section">
        <h2>Shipping Address</h2>
        <input
          type="text"
          placeholder="Street Address"
          value={shippingAddress.street}
          onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
          className="checkout-input"
        />
        <input
          type="text"
          placeholder="City"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
          className="checkout-input"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={shippingAddress.postalCode}
          onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
          className="checkout-input"
        />
        <input
          type="text"
          placeholder="Country"
          value={shippingAddress.country}
          onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
          className="checkout-input"
        />
      </div>

      {/* Payment Method */}
      <div className="checkout-section">
        <h2>Payment Method</h2>
        
        {cards.length > 0 && (
          <div>
            <h3>Saved Cards</h3>
            {cards.map(card => (
              <div key={card._id} className="checkout-card-option">
                <label>
                  <input
                    type="radio"
                    name="card"
                    checked={selectedCard?._id === card._id}
                    onChange={() => {setSelectedCard(card); setShowAddCard(false);}}
                  />
                  {card.cardType} ending in {card.lastFourDigits} (Exp: {card.expiryMonth}/{card.expiryYear})
                  {card.isDefault && <span className="checkout-default-badge">✓ Default</span>}
                </label>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {setShowAddCard(!showAddCard); setSelectedCard(null);}}
          className="checkout-add-card-btn"
        >
          {showAddCard ? 'Cancel' : '+ Add New Card'}
        </button>

        {showAddCard && (
          <form onSubmit={handleAddCard} className="checkout-card-form">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={newCard.cardholderName}
              onChange={(e) => setNewCard({...newCard, cardholderName: e.target.value})}
              required
              className="checkout-input"
            />
            <input
              type="text"
              placeholder="Card Number (16 digits)"
              value={newCard.cardNumber}
              onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value.replace(/\s/g, '')})}
              maxLength="16"
              required
              className="checkout-input"
            />
            <div className="checkout-card-expiry">
              <input
                type="text"
                placeholder="MM"
                value={newCard.expiryMonth}
                onChange={(e) => setNewCard({...newCard, expiryMonth: e.target.value})}
                maxLength="2"
                required
              />
              <input
                type="text"
                placeholder="YY"
                value={newCard.expiryYear}
                onChange={(e) => setNewCard({...newCard, expiryYear: e.target.value})}
                maxLength="2"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                value={newCard.cvv}
                onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                maxLength="4"
                required
              />
            </div>
            <label>
              <input
                type="checkbox"
                checked={newCard.saveCard}
                onChange={(e) => setNewCard({...newCard, saveCard: e.target.checked})}
              />
              Save card for future use
            </label>
            <button type="submit" className="checkout-save-card-btn">
              Save Card
            </button>
          </form>
        )}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="checkout-place-order-btn"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;