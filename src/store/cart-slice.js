import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

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

// create own action creator (default action creators are like cartActions.addItemToCart({...}))
export const sendCartData = (cart) => {
  // Redux Toolkit gives automatically "dispatch" parameter, so that you can dispatch actions in returned fn
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data',
      })
    );

    const sendRequest = async () => {
      const options = {
        method: 'PUT', // overwriting existing data
        body: JSON.stringify(cart),
      };
      // firebase test backend: 'cart.json' creates new cart node in database and store data there
      const res = await fetch(
        'https://react-http-ba0a9-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        options
      );

      if (!res.ok) throw new Error('Sending data failed.');
    };

    // catch all kinds of errors that could occur in this sendRequest fn
    // and dispatch your wished succes or error action
    try {
      // sendRequest is async fn, that means it returns a Promise obj, so have to use await
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Sent cart data successfully',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending data failed',
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
