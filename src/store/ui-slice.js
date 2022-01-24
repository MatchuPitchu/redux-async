import { createSlice } from '@reduxjs/toolkit';
// for VERSION 2: with createAsyncThunk
import { fetchCartDataV2, sendCartDataV2 } from './cart-actions';

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

// for VERSION 2: with createAsyncThunk
const uiSliceV2 = createSlice({
  name: 'ui',
  initialState: { isCartVisible: false, notification: null },
  reducers: {
    toggle: (state) => {
      /* look at code V1 */
    },
    // remove showNotifcation action of original code V1
  },
  extraReducers: {
    'cart/fetchData/rejected': (state, action) => {
      state.notification = {
        status: 'error',
        title: 'Error',
        message: action.error.message || 'Fetching data failed',
      };
    },
    'cart/sendData/pending': (state) => {
      state.notification = {
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      };
    },
    'cart/sendData/fulfilled': (state) => {
      state.notification = {
        status: 'success',
        title: 'Success',
        message: 'Sent cart data successfully',
      };
    },
    'cart/sendData/rejected': (state) => {
      state.notification = {
        status: 'error',
        title: 'Error',
        message: 'Sending data failed',
      };
    },
  },
});
