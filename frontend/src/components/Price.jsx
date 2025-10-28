import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/CartContext';

function Price({ product }) {
 const { addToCart } = useCart();
  const [stock, setStock] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const getAllSizes = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/sizes`);
      // console.log(response.data.sizes);
      setSizes(response.data.sizes);
    };

    const getStock = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/${product._id}/stock`
      );
      //console.log(response.data.stock);
      setStock(response.data.stock);
    };

    if (product != null) {
      getStock();
      getAllSizes();
    }
  }, [product]);

  // get one of each color
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


        setSelectedColor(null)
        setSelectedSize(null)
    }
}

  console.log(product);
  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h2>{product.price} kr</h2>
      <p>Colors available: {availableColors.join(", ")}</p>
      <p>Product type: {isKidProduct ? "Kids" : "Adults"}</p>
      <p>Relevant : {relevantSizes.map((e) => e.value).join(", ")}</p>

      {availableColors.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Select Color:</h3>
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                setSelectedSize(null); // Reset size when color changes
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: selectedColor === color ? "#333" : "#fff",
                color: selectedColor === color ? "#fff" : "#333",
                border: "2px solid #333",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {color}
            </button>
          ))}
        </div>
      )}

      {selectedColor && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Select Size:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {relevantSizes.map((size) => {
              const available = isSizeAvailable(size._id);
              const quantity = getStockInfo(size._id, selectedColor);

              return (
                <button
                  key={size._id}
                  onClick={() => available && setSelectedSize(size)}
                  disabled={!available}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      selectedSize?._id === size._id
                        ? "#333"
                        : available
                        ? "#fff"
                        : "#f0f0f0",
                    color:
                      selectedSize?._id === size._id
                        ? "#fff"
                        : available
                        ? "#333"
                        : "#999",
                    border: available ? "2px solid #333" : "2px solid #ddd",
                    borderRadius: "4px",
                    cursor: available ? "pointer" : "not-allowed",
                    opacity: available ? 1 : 0.5,
                    textDecoration: !available ? "line-through" : "none",
                  }}
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
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: selectedSize && selectedColor ? "#000" : "#ccc",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: selectedSize && selectedColor ? "pointer" : "not-allowed",
        }}
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
