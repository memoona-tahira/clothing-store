import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config/api';

function Price({ product }) {
  const { addToCart } = useCart();
  const [stock, setStock] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const getAllSizes = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/v1/sizes`);
      setSizes(response.data.sizes);
    };

    const getStock = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/products/${product._id}/stock`
      );
      setStock(response.data.stock);
    };

    if (product != null) {
      getStock();
      getAllSizes();
    }
  }, [product]);

  const availableColors = [...new Set(stock.map((item) => item.color))];
  const isKidProduct = product.categoryId === "68e8d758a3faaeb01d40dce3";

  const relevantSizes = sizes.filter((size) =>
    isKidProduct ? size.forKids : !size.forKids
  );

  const getStockInfo = (sizeId, color) => {
    const stockItem = stock.find(
      (item) => item.sizeId === sizeId && item.color === color
    );
    return stockItem ? stockItem.quantity : 0;
  };

  const isSizeAvailable = (sizeId) => {
    if (!selectedColor) return false;
    return getStockInfo(sizeId, selectedColor) > 0;
  };

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) { 
      addToCart(product, selectedSize.value, selectedColor, 1);
      alert(
        `Added to cart:\n${product.name}\nSize: ${selectedSize.value}\nColor: ${selectedColor}`
      );
      setSelectedColor(null);
      setSelectedSize(null);
    }
  };

  return (
    <div className="price-container">
      <h2>{product.price} kr</h2>
      <p>Colors available: {availableColors.join(", ")}</p>
      <p>Product type: {isKidProduct ? "Kids" : "Adults"}</p>
      <p>Relevant : {relevantSizes.map((e) => e.value).join(", ")}</p>

      {availableColors.length > 0 && (
        <div className="price-color-section">
          <h3>Select Color:</h3>
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                setSelectedSize(null);
              }}
              className={`price-color-btn ${selectedColor === color ? 'selected' : ''}`}
            >
              {color}
            </button>
          ))}
        </div>
      )}

      {selectedColor && (
        <div className="price-size-section">
          <h3>Select Size:</h3>
          <div className="price-size-grid">
            {relevantSizes.map((size) => {
              const available = isSizeAvailable(size._id);
              const quantity = getStockInfo(size._id, selectedColor);

              return (
                <button
                  key={size._id}
                  onClick={() => available && setSelectedSize(size)}
                  disabled={!available}
                  className={`price-size-btn ${
                    selectedSize?._id === size._id ? 'selected' : 
                    available ? 'available' : 'unavailable'
                  }`}
                  title={available ? `${quantity} in stock` : "Out of stock"}
                >
                  {size.value}
                  {available && (
                    <span style={{ fontSize: "0.8em" }}> ({quantity})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || !selectedColor}
        className={`price-add-to-cart-btn ${
          selectedSize && selectedColor ? 'enabled' : 'disabled'
        }`}
      >
        {!selectedColor
          ? "Select Color"
          : !selectedSize
          ? "Select Size"
          : "Add to Cart"}
      </button>
    </div>
  );
}

export default Price;