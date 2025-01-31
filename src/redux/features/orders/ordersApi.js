import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`, // Backend base URL for orders API
    credentials: "include", // Include credentials for authentication
  }),
  tagTypes: ["Orders"], // Tags for cache management
  endpoints: (builder) => ({
    // Mutation to create a new order
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder, // Pass the new order data
      }),
      invalidatesTags: ["Orders"], // Invalidate cache to refresh data
    }),
    // Query to fetch orders by email
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`, // API endpoint for getting orders by email
        method: "GET",
      }),
      providesTags: ["Orders"], // Provides cache tags
    }),
  }),
});

// Export the generated hooks for your components
export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;

// Export the orders API for store configuration
export default ordersApi;
