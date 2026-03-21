import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utils/baseURL";

const authApi = createApi({
  reducerPath: "authApi",
  // Configure base fetch behavior, injecting JWT properly into headers for protected routes
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/auth`,
    credentials: "include",
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
  // tagTypes declare specific cache tags that can be invalidated immediately to prompt UI refetching
  tagTypes: ["User"],
  endpoints: (builder) => ({
    //Register
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    //Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    //Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    //get user
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
    // delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    //update user role
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
    //edit profile
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: `/edit-profile`,
        method: "PATCH",
        body: profileData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
} = authApi;
export default authApi;
