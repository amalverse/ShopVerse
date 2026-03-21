import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  // Base setup mapping to backend orders route with standard token embedding
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/orders`,
    credentials: "include", // Send cookies for cookie-based auth
    // Read the JWT from Redux state (same pattern as authApi & productsApi).
    // The app stores the full user object under state.auth.user, with the token
    // nested at user.token or user.user.token depending on login response shape.
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const user = state.auth?.user;
      const token = user?.token || user?.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // RTK cache tagging mapping for precise invalidations automatically upon mutations
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // Create new Stripe checkout session to process user payments securely
    createCheckoutSession: builder.mutation({
      query: (payload) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: payload,
      }),
    }),
    confirmPayment: builder.mutation({
      query: (session_id) => ({
        url: "/confirm-payment",
        method: "POST",
        body: { session_id },
      }),
    }),
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      // Actively clear specific query cache results so the user immediately sees updated statuses
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useConfirmPaymentMutation,
  useGetOrdersByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = ordersApi;
export default ordersApi;
