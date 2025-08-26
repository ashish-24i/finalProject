import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <header className="header">
      <div className="nav">
        <div className="brand">
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" fill="#5b8cff" />
              <path d="M6 12h12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>ShoppyGlobe</span>
          </Link>
          <span className="badge">Demo</span>
        </div>

        <div className="links">
          <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to="/">Home</Link>
            <Link to="/cart" className="cart-link">
              Cart <span style={{ marginLeft: 8 }} className="badge">{totalItems}</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
