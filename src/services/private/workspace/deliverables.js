import { privateApi } from '..';

export const deliverablesApi = privateApi.injectEndpoints({
  endpoints: build => ({
    listWSDeliverables: build.query({
      query: id => `/dashboard/client/workspace/deliverable/list/?workspace=${id}`,
      providesTags: ['ListAllFreelancerDeliverables'],
    }),
    listFreelancerWSDeliverables: build.query({
      query: id => `/dashboard/freelancer/workspace/deliverable/list/?workspace=${id}`,
      providesTags: ['ListAllFreelancerDeliverables'],
    }),
  }),
});

export const { useListWSDeliverablesQuery, useListFreelancerWSDeliverablesQuery } = deliverablesApi;
