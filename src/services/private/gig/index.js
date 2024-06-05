import { privateApi } from 'services/private';

export const gigApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getGigDetails: build.query({
      query: id => `/gig/${id}/detail/`,
      providesTags: ['GetGigData'],
    }),
    getGigList: build.query({
      query: body => `/gig/user/gig/list/?id=${body.id}&status=${body?.status || ''}`,
      providesTags: ['GetGigList'],
    }),
    deleteGig: build.mutation({
      query: id => ({
        url: `/gig/overview/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetGigList'],
    }),
  }),
});

export const { useGetGigDetailsQuery, useGetGigListQuery, useDeleteGigMutation } = gigApi;
