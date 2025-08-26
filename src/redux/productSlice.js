import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Fetch products from dummyjson.com
 * returns array of products
 */
export const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) {
      return rejectWithValue("Network response was not ok");
    }
    const json = await res.json();
    return json.products || [];
  } catch (err) {
    return rejectWithValue(err.message || "Failed to fetch");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default productSlice.reducer;
