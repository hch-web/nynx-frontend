import { privateApi } from 'services/private';

export const descriptionApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getDescriptionData: build.query({
      query: id => `/gig/faq/?id=${id}`,
      providesTags: ['GetDescription'],
    }),
    updateDescription: build.mutation({
      query: body => ({
        url: `/gig/faq/${body.gig}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetDescription', 'GetGigData', 'GetGigList'],
    }),
  }),
});

export const { useGetDescriptionDataQuery, useUpdateDescriptionMutation } = descriptionApi;
