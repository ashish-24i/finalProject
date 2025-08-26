import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | succeeded | failed
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setStatus("loading");
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setStatus("succeeded");
      })
      .catch((err) => {
        setError(err.message || "Error");
        setStatus("failed");
      });
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    const payload = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    dispatch(addToCart(payload));
  };

  if (status === "loading") return <p className="status">Loading product...</p>;
  if (status === "failed") return <p className="status">Error: {error}</p>;
  if (!product) return null;

  return (
    <article style={{ display: "grid", gap: 18 }}>
      <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <img src={product.thumbnail} alt={product.title} style={{ height: 320, objectFit: "cover" }} />
        </div>
        <div className="card-body">
          <h2 style={{ margin: 0 }}>{product.title}</h2>
          <p style={{ color: "var(--muted)" }}>{product.brand} • {product.category}</p>
          <div className="price" style={{ fontSize: 22 }}>${product.price}</div>
          <p style={{ marginTop: 8 }}>{product.description}</p>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="btn primary" onClick={handleAdd}>Add to Cart</button>
            <a href="#reviews" className="btn">Reviews</a>
          </div>
        </div>
      </div>

      <section id="specs" className="item-row">
        <h3 style={{ margin: 0 }}>Product details</h3>
        <div style={{ color: "var(--muted)", marginTop: 8 }}>
          <div>Rating: {product.rating}</div>
          <div>Stock: {product.stock}</div>
        </div>
      </section>
    </article>
  );
}
