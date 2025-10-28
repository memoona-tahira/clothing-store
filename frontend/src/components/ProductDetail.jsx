import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Price from "./Price";

function ProductDetail() {
  //get id from url
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("prd"); //
  // State for the single product
  const [product, setProduct] = useState(null);

  // State for the selected size
  const [selectedSize, setSelectedSize] = useState("");

  // Fetch product details from backend
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products/${productId}`
      );
      setProduct(response.data.product);
    };
    fetchProduct();
  }, [productId]); // re-run when productId changes

  //useEffect call api.. getproductbyid (http://localhost:3000/api/v1/products/68e8dfef7b28e96ccb4f3abc)
  //const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
  if (!product) {
    return <p>Loading...</p>; // or a spinner if you want
  }

  return (
    <div className="productOuterDiv">
      <div className="productInfo">
        {/* Images section */}
        <div>
          {product.images && product.images.length > 0 ? (
            product.images.map((img, index) => (
              <img
                className="product-detail-image"
                key={index}
                src={`${img}`}
                alt={`${product.name} ${index + 1}`}
              />
            ))
          ) : (
            <img src="/placeholder.png" alt="placeholder" />
          )}
        </div>

        {/* Product info section */}
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="priceDetails">
        <Price product={product}></Price>
      </div>
    </div>
  );
}

export default ProductDetail;
