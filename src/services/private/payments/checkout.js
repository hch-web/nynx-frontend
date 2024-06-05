import { privateApi } from '..';

export const checkoutApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getOrderDetails: build.query({
      query: body => `/payments/get/checkout/${body.id}/?task_via=${body.taskVia}`,
      providesTags: ['GetOrderDetails'],
    }),
    confirmCheckout: build.mutation({
      query: body => ({
        url: '/payments/create/payment/intents/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ListAllProposals'],
    }),
    confirmJobOfferPayment: build.mutation({
      query: body => ({
        url: '/payments/confirm/stripe/payment/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ListAllProposals'],
    }),
    sendPaypalOrderDetails: build.mutation({
      query: body => ({
        url: '/payments/create/paypal/payment/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ListAllProposals'],
    }),
    getChangeTermsById: build.query({
      query: id => `/dashboard/client/change/terms/request/${id}/`,
    }),
  }),
});

export const {
  useGetOrderDetailsQuery,
  useConfirmCheckoutMutation,
  useConfirmJobOfferPaymentMutation,
  useSendPaypalOrderDetailsMutation,
  useGetChangeTermsByIdQuery,
} = checkoutApi;
