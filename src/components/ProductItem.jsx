import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    // Minimal product payload saved in cart (keeps quantity field)
    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    dispatch(addToCart(payload));
  };

  return (
    <article className="card">
      <img src={product.thumbnail} alt={product.title} />
      <div className="card-body">
        <div>
          <div className="card-title">{product.title}</div>
          <div className="price">${product.price}</div>
        </div>

        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          {product.brand} • {product.category}
        </p>

        <div className="actions">
          <button className="btn" onClick={handleAdd}>Add to Cart</button>
          <Link to={`/product/${product.id}`} className="btn primary" style={{ textAlign: "center" }}>
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
