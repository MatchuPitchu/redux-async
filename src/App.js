import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { uiActions } from './store/ui-slice';
import { sendCartData, fetchCartData } from './store/cart-actions';
import Notification from './components/UI/Notification';
import Layout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';

const App = () => {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // 2) Second approach do perform async tasks with Redux:
  // first dispatch actions to update state in redux store,
  // then watch updated state with useEffect and perform async tasks or side-effects
  // useEffect(() => {
  //   if (isInital) {
  //     isInital = false;
  //     return;
  //   }

  //   const sendData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data',
  //       })
  //     );

  //     const options = {
  //       method: 'PUT', // overwriting existing data
  //       body: JSON.stringify(cart),
  //     };
  //     // firebase test backend: 'cart.json' creates new cart node in database and store data there
  //     const res = await fetch(
  //       'https://react-http-ba0a9-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
  //       options
  //     );

  //     if (!res.ok) throw new Error('Sending data failed.');

  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success',
  //         message: 'Sent cart data successfully',
  //       })
  //     );
  //   };

  //   // async fn returns a Promise: so you can catch all kinds of errors
  //   // that could occur in this fn and dispatch your wished error action
  //   sendData().catch((_) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error',
  //         message: 'Sending data failed',
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  // 3) Third approach: use Action Creator Thunk to put logic into Redux Toolkit files
  // for that take code of inside useEffect (look at approach 2) into your state slice file
  // and create there your own action creator thunk that returns another fn;
  // Redux Toolkit accepts as arg for dispatch() also action creators that returns another fn;
  // Toolkit notices that and will execute that returned fn for you
  useEffect(() => {
    // only if data was changed locally, send HTTP request
    if (cart.changedLocally) dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  // fetch cart data from backend when app is mounted
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
};

export default App;
