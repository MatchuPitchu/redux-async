import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isCartVisible: false, notification: null },
  reducers: {
    toggle: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
    showNotification: (state, { payload: { status, title, message } }) => {
      state.notification = {
        status,
        title,
        message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
