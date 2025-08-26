import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductItem from "./ProductItem";

export default function ProductList() {
  useFetchProducts();

  const { items = [], status, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.trim().toLowerCase();
    return items.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <section>
      <div className="searchbar" style={{ marginBottom: 18 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, brands or descriptions..."
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="btn">Search</button>
        </div>
      </div>

      {status === "loading" && <p className="status">Loading products...</p>}
      {status === "failed" && <p className="status">Error: {error}</p>}

      {status === "succeeded" && (
        <div className="grid" aria-live="polite">
          {filtered.length === 0 ? (
            <p className="status">No products found.</p>
          ) : (
            filtered.map((product) => <ProductItem key={product.id} product={product} />)
          )}
        </div>
      )}
    </section>
  );
}
