import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/reviews`,
    credentials: "include",
  }),
  // Tag types help UI components react intelligently to remote server updates
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // Exposes UI functionality to add a user review. Ensures the product specific review cache receives invalidation right after
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
      ],
    }),
    // Exposes a query to retrieve global review interactions purely for metrics
    getReviewsCount: builder.query({
      query: () => "/total-reviews",
      providesTags: ["Reviews"],
    }),
    // get reviews by user id
    getReviewsByUserId: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: (result, error, userId) => [
        { type: "Reviews", id: userId },
      ],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewApi;

export default reviewApi;
