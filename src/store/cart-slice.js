import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    replaceCart: (state, { payload: { totalQuantity, items } }) => {
      state.totalQuantity = totalQuantity;
      state.items = items;
    },
    addItemToCart: (state, { payload: { id, title, price } }) => {
      state.totalQuantity++;

      const existingItem = state.items.find((item) => item.id === id);
      // following manipulating of existing state would be NO GO without Redux Toolkit
      if (!existingItem) {
        state.items.push({
          id,
          title,
          price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    removeItemFromCart: (state, { payload: id }) => {
      state.totalQuantity--;

      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
