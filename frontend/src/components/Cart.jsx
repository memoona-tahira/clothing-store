import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>

      {cartItems.map((item, index) => (
        <div
          key={`${item.productId}-${item.size}-${item.color}-${index}`}
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            borderBottom: '1px solid #ddd',
            alignItems: 'center'
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>Size: {item.size} | Color: {item.color}</p>
            <p style={{ fontWeight: 'bold' }}>{item.price} kr</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
            >
              +
            </button>
          </div>

          <p style={{ fontWeight: 'bold', minWidth: '80px' }}>
            {item.price * item.quantity} kr
          </p>

          <button
            onClick={() => removeFromCart(item.productId, item.size, item.color)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={{ marginTop: '2rem', textAlign: 'right' }}>
        <h2>Total: {getCartTotal()} kr</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button
            onClick={clearCart}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>
          <button
            onClick={() => alert('Checkout functionality coming soon!')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;