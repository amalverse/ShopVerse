// Import configureStore heavily simplifies setup by automatically adding standard middleware like Thunk
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import productsApi from "./features/products/productsApi";
import reviewApi from "./features/reviews/reviewsApi";
import ordersApi from "./features/orders/ordersApi";

export const store = configureStore({
  reducer: {
    // Standard Redux Slices
    cart: cartReducer,
    auth: authReducer,

    // RTK Query APIs auto-generated reducers managing cache state
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  // Adding the API middleware enables core RTK Query features like caching, invalidation, polling, and fast rendering
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware,
      ordersApi.middleware,
    ),
});
