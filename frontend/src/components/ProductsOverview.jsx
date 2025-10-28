import { Link } from "react-router-dom";

function ProductsOverview({ product }) {
  return (
    <Link to={`/product-detail?prd=${product._id}`}>
      <div className="product-card">
        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image"
          />
        )}
        <p>{product.name}</p>
        <p>
          <b>{product.price}</b>:kr
        </p>
        {/* Always check if images exist before accessing index 0 */}
      </div>
    </Link>
  );
}
export default ProductsOverview;
