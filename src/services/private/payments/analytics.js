import { privateApi } from '..';

export const analyticsApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getAnalyticsDetails: build.query({
      query: body => ({
        url: '/payments/get/total/earning/',
        params: {
          month: body?.month?.value || undefined,
        },
        method: 'GET',
      }),
      providesTags: ['GetAnalyticsDetails'],
    }),
    getWalletDetails: build.mutation({
      query: body => ({
        url: '/payments/get/total/earning/',
        params: {
          month: body?.month?.value || undefined,
        },
        method: 'GET',
      }),
      providesTags: ['GetAnalyticsDetails', 'GetWalletDetails'],
      // invalidatesTags: ['GetAnalyticsDetails'],
    }),
  }),
});

export const { useLazyGetAnalyticsDetailsQuery, useGetAnalyticsDetailsQuery, useGetWalletDetailsMutation } = analyticsApi;
