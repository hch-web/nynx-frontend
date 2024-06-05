import { privateApi } from '..';

export const proposalApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getSubmittedProposals: build.query({
      query: () => '/dashboard/freelancer/sent/offer/list/',
      providesTags: ['GetSubmitedProposals']
    }),
    getSubmittedProposalDetail: build.query({
      query: id => `/dashboard/freelancer/sent/offer/details/${id}/`,
    }),
  }),
});

export const { useGetSubmittedProposalsQuery, useGetSubmittedProposalDetailQuery } = proposalApi;
