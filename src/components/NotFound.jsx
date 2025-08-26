import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section style={{ textAlign: "center", padding: 48 }}>
      <h2>404 — Page Not Found</h2>
      <p className="status">We couldn't find the page you're looking for.</p>
      <Link to="/" className="btn primary" style={{ marginTop: 12 }}>Return Home</Link>
    </section>
  );
}
