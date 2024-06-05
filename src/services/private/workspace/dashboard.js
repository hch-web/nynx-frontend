import { privateApi } from '..';

export const dashboardApi = privateApi.injectEndpoints({
  endpoints: build => ({
    recentFreelancers: build.query({
      query: () => '/dashboard/client/workspace/recent/freelancers/',
      providesTags: ['GetRecentFreelancers'],
    }),
  }),
});

export const { useRecentFreelancersQuery } = dashboardApi;
