import { privateApi } from '..';

export const proposalsApi = privateApi.injectEndpoints({
  endpoints: build => ({
    submittedProposals: build.query({
      query: body => `/dashboard/freelancer/workspace/proposals/list/?budget_type=${body?.budget_type || ''}&workspace=${
        body.workspaceId
      }`,
      providesTags: ['ListAllSubmittedProposals'],
    }),
  }),
});

export const { useLazySubmittedProposalsQuery } = proposalsApi;
