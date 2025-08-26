import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import NotFound from "./components/NotFound";



// Lazy loading for performance
const ProductList = lazy(() => import("./components/productList"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Cart = lazy(() => import("./components/Cart"));

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Suspense fallback={<p className="status">Loading...</p>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
