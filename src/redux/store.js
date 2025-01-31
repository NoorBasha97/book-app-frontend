import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cart/cartSlice';
import booksApi from './features/books/booksApi';
import ordersApi from './features/orders/ordersApi';

export const store = configureStore({
  reducer: {
    // Add non-RTK Query slices
    cart: cartReducer,

    // Add RTK Query reducers
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // Add RTK Query middleware for APIs
      .concat(booksApi.middleware, ordersApi.middleware),
});

export default store;
