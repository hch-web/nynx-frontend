import { privateApi } from '..';

export const refundTaskApi = privateApi.injectEndpoints({
  endpoints: build => ({
    requestRefund: build.mutation({
      query: body => ({
        url: '/dashboard/freelancer/refund/request/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetRequestRefundList'],
    }),
    getRequestedRefundList: build.query({
      query: body => ({
        url: `/dashboard/client/list/refund/request/?task_id=${body.id}&task_via=${body.taskVia}`,
      }),
      providesTags: ['GetRequestRefundList'],
      keepUnusedDataFor: 0
    }),
    updateRequestedRefundStatus: build.mutation({
      query: body => ({
        url: `/dashboard/client/refund/request/update/${body.id}/`,
        method: 'PATCH',
        body: {
          status: body.status,
        },
      }),
      invalidatesTags: ['GetRequestRefundList'],
    }),
    acceptStripeRefund: build.mutation({
      query: body => ({
        url: '/payments/create/cash/refund/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetRequestRefundList'],
    }),
    acceptPaypalRefund: build.mutation({
      query: body => ({
        url: '/payments/create/paypal/refund/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetRequestRefundList'],
    }),
  }),
});

export const {
  useRequestRefundMutation,
  useGetRequestedRefundListQuery,
  useUpdateRequestedRefundStatusMutation,
  useAcceptStripeRefundMutation,
  useAcceptPaypalRefundMutation
} = refundTaskApi;
