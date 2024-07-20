/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

//Parent for any other API Slices

// Update with your backend URL

// Parent for any other API Slices
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Customer", "User", "Meter", "Reading", "Balance", "Payment"], // Define the tag types based on your data
  endpoints: (builder) => ({
    // Customer Endpoints
    getCustomers: builder.query({
      query: () => "/customers",
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: ["Customer"],
    }),
    addCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: "/customers",
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...updatedCustomer }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body: updatedCustomer,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),

    // Meter Endpoints
    getMeters: builder.query({
      query: () => "/meters",
      providesTags: ["Meter"],
    }),
    getMeterById: builder.query({
      query: (id) => `/meters/${id}`,
      providesTags: ["Meter"],
    }),
    addMeter: builder.mutation({
      query: (newMeter) => ({
        url: "/meters",
        method: "POST",
        body: newMeter,
      }),
      invalidatesTags: ["Meter"],
    }),
    updateMeter: builder.mutation({
      query: ({ id, ...updatedMeter }) => ({
        url: `/meters/${id}`,
        method: "PUT",
        body: updatedMeter,
      }),
      invalidatesTags: ["Meter"],
    }),
    deleteMeter: builder.mutation({
      query: (id) => ({
        url: `/meters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Meter"],
    }),

    // Reading Endpoints
    getReadings: builder.query({
      query: () => "/readings",
      providesTags: ["Reading"],
    }),
    getReadingById: builder.query({
      query: (id) => `/readings/${id}`,
      providesTags: ["Reading"],
    }),
    addReading: builder.mutation({
      query: (newReading) => ({
        url: "/readings",
        method: "POST",
        body: newReading,
      }),
      invalidatesTags: ["Reading"],
    }),
    updateReading: builder.mutation({
      query: ({ id, ...updatedReading }) => ({
        url: `/readings/${id}`,
        method: "PUT",
        body: updatedReading,
      }),
      invalidatesTags: ["Reading"],
    }),
    deleteReading: builder.mutation({
      query: (id) => ({
        url: `/readings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reading"],
    }),

    // Balance Endpoints
    getBalances: builder.query({
      query: () => "/balances",
      providesTags: ["Balance"],
    }),
    getBalanceById: builder.query({
      query: (id) => `/balances/${id}`,
      providesTags: ["Balance"],
    }),
    addBalance: builder.mutation({
      query: (newBalance) => ({
        url: "/balances",
        method: "POST",
        body: newBalance,
      }),
      invalidatesTags: ["Balance"],
    }),
    updateBalance: builder.mutation({
      query: ({ id, ...updatedBalance }) => ({
        url: `/balances/${id}`,
        method: "PUT",
        body: updatedBalance,
      }),
      invalidatesTags: ["Balance"],
    }),
    deleteBalance: builder.mutation({
      query: (id) => ({
        url: `/balances/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Balance"],
    }),

    // Payment Endpoints
    getPayments: builder.query({
      query: () => "/payments",
      providesTags: ["Payment"],
    }),
    getPaymentById: builder.query({
      query: (id) => `/payments/${id}`,
      providesTags: ["Payment"],
    }),
    addPayment: builder.mutation({
      query: (newPayment) => ({
        url: "/payments",
        method: "POST",
        body: newPayment,
      }),
      invalidatesTags: ["Payment"],
    }),
    updatePayment: builder.mutation({
      query: ({ id, ...updatedPayment }) => ({
        url: `/payments/${id}`,
        method: "PUT",
        body: updatedPayment,
      }),
      invalidatesTags: ["Payment"],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetMetersQuery,
  useGetMeterByIdQuery,
  useAddMeterMutation,
  useUpdateMeterMutation,
  useDeleteMeterMutation,
  useGetReadingsQuery,
  useGetReadingByIdQuery,
  useAddReadingMutation,
  useUpdateReadingMutation,
  useDeleteReadingMutation,
  useGetBalancesQuery,
  useGetBalanceByIdQuery,
  useAddBalanceMutation,
  useUpdateBalanceMutation,
  useDeleteBalanceMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = apiSlice;
