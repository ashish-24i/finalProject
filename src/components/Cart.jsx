import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
    const items = cart.reduce((s, it) => s + (it.quantity || 1), 0);
    return { subtotal, items };
  }, [cart]);

  if (cart.length === 0) {
    return (
      <section style={{ textAlign: "center", padding: 40 }}>
        <h3>Your cart is empty</h3>
        <p className="status">Add products from the home page.</p>
        <Link to="/" className="btn primary" style={{ marginTop: 12 }}>Go Shopping</Link>
      </section>
    );
  }

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gap: 12 }}>
        {cart.map((item) => <CartItem key={item.id} item={item} />)}
      </div>

      <div className="item-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "var(--muted)" }}>Items: {totals.items}</div>
          <div style={{ fontWeight: 700, marginTop: 6 }}>Subtotal: ${totals.subtotal.toFixed(2)}</div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn">Continue Shopping</button>
          <button className="btn primary">Checkout</button>
        </div>
      </div>
    </section>
  );
}
