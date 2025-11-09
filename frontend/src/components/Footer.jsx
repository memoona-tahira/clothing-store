import React, { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h3 className="footer-logo">FASHION STORE</h3>
          <p className="footer-description">
            Your destination for premium quality clothing. 
            Style meets comfort in every piece.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Pinterest">📌</a>
          </div>
        </div>

        {/* Shop Links */}
        <div className="footer-section">
          <h4>Shop</h4>
          <ul className="footer-links">
            <li><a href="/products?cat=Men">Men's Collection</a></li>
            <li><a href="/products?cat=Women">Women's Collection</a></li>
            <li><a href="/products?cat=Kids">Kids Collection</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Sale</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Store Locations</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p className="footer-newsletter-text">
            Subscribe to get special offers and updates
          </p>
          <div className="footer-newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address"
              className="footer-newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              onClick={handleSubscribe}
              className="footer-newsletter-btn"
            >
              Subscribe
            </button>
          </div>
          <div className="footer-payment-icons">
            <span>💳</span>
            <span>💳</span>
            <span>💳</span>
            <span>💳</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Fashion Store. All rights reserved.</p>
        <p className="footer-credits">Made with ❤️ for fashion lovers</p>
      </div>
    </footer>
  );
}

export default Footer;