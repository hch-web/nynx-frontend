import { privateApi } from 'services/private';

export const requirementApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getRequirements: build.query({
      query: id => `/gig/requirement/?id=${id}`,
      providesTags: ['GetRequirements'],
    }),
    updateRequirments: build.mutation({
      query: body => ({
        url: `/gig/requirement/${body.gig}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetRequirements', 'GetGigList'],
    }),
  }),
});

export const {
  useGetRequirementsQuery, useUpdateRequirmentsMutation
} = requirementApi;
