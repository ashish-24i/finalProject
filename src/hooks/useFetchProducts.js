import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

/**
 * Custom hook to ensure products are fetched once.
 * - dispatches fetchProducts if status is idle
 */
export default function useFetchProducts() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);
}
