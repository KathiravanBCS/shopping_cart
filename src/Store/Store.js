// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Slice/cartSlice.js';
import userReducer from '../Slice/userSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});