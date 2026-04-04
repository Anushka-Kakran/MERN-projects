import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);

      if (item) {
        item.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) =>
      state.filter(i => i.id !== action.payload),

    increaseQty: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },

    decreaseQty: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },

    clearCart: () => [],

    // ✅ IMPORTANT (for backend sync)
    setCart: (state, action) => {
      return action.payload;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;