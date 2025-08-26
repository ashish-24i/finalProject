import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart state: array of { id, title, price, thumbnail, quantity }
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const existing = state.find((it) => it.id === payload.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.push({ ...payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      return state.filter((it) => it.id !== id);
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const it = state.find((s) => s.id === id);
      if (it) it.quantity = (it.quantity || 1) + 1;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const it = state.find((s) => s.id === id);
      if (it) {
        if ((it.quantity || 1) > 1) {
          it.quantity = it.quantity - 1;
        } else {
          // remove if quantity would drop below 1
          return state.filter((s) => s.id !== id);
        }
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
