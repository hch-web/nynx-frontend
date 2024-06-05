import { privateApi } from '..';

export const analyticApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getUserRatingAnalytics: build.query({
      query: () => '/dashboard/freelancer/rating/',
    }),
    getUserSellerLevelAnalytics: build.query({
      query: () => '/dashboard/freelancer/seller/level/',
    }),
  }),
});

export const { useLazyGetUserRatingAnalyticsQuery, useLazyGetUserSellerLevelAnalyticsQuery } = analyticApi;
