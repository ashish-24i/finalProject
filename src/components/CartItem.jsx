import React from "react";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="item-row" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <img src={item.thumbnail} alt={item.title} style={{ width: 96, height: 72, objectFit: "cover", borderRadius: 8 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>{item.title}</strong>
          <div className="price">${(item.price || 0).toFixed(2)}</div>
        </div>

        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <div className="qty-controls">
            <button className="btn" onClick={() => dispatch(decreaseQty(item.id))}>-</button>
            <span style={{ padding: "6px 10px", minWidth: 36, textAlign: "center" }}>{item.quantity || 1}</span>
            <button className="btn" onClick={() => dispatch(increaseQty(item.id))}>+</button>
          </div>

          <button className="btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      </div>
    </div>
  );
}
