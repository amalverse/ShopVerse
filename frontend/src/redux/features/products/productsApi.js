import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const productsApi = createApi({
  reducerPath: "productsApi",
  // The fetchBaseQuery setup manages our connection to the core products backend
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/products`,
    credentials: "include",
    // Inject the JWT from Redux state as Authorization header
    // (needed because cross-origin cookies don't work in dev: 5173 → 3000)
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const user = state.auth?.user;
      const token = user?.token || user?.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  // Products tags allow quick invalidation for fast UI sync on state mutation
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // Fetch a paginated list of catalog products handling complex filters systematically
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        // Only include price params when they are actually set
        const params = {
          category: category || "",
          color: color || "",
          page: page.toString(),
          limit: limit.toString(),
        };
        if (minPrice !== "" && minPrice !== undefined && minPrice !== null) {
          params.minPrice = minPrice.toString();
        }
        if (maxPrice !== "" && maxPrice !== undefined && maxPrice !== null) {
          params.maxPrice = maxPrice.toString();
        }
        const queryParams = new URLSearchParams(params).toString();
        return `/?${queryParams}`;
      },
      providesTags: ["Products"],
    }),

    // Simple robust query to request individual product information, passing product ID down safely
    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    //create product
    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-products",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),

    //get related products
    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
    }),

    //update product
    updateProduct: builder.mutation({
      query: ({ id, updates }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: updates,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),

    // Delete a Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useFetchRelatedProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

export default productsApi;
