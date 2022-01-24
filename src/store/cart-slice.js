import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    // helper variable to avoid that - when opening app - fetched cart data is immediately sended back to server
    changedLocally: false,
  },
  reducers: {
    replaceCart: (state, { payload: { totalQuantity, items } }) => {
      state.items = items;
      state.totalQuantity = totalQuantity;
    },
    addItemToCart: (state, { payload: { id, title, price } }) => {
      state.totalQuantity++;
      state.changedLocally = true;

      const existingItem = state.items.find((item) => item.id === id);
      // NEVER DO following manipulating of existing state without Redux Toolkit
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
      state.changedLocally = true;

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
