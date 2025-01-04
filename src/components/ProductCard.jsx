import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Price: ${product.price}</p>
      <p className="product-stock">Stock: {product.stock}</p>
      <button className="add-to-cart-btn">Add to Cart</button>
      <button className="buy-now-btn">Buy Now</button>
    </div>
  );
};

export default ProductCard;
