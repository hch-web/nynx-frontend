import { privateApi } from '..';

export const freelancersApi = privateApi.injectEndpoints({
  endpoints: build => ({
    listWorkspaceProposals: build.query({
      query: workspaceId => `/dashboard/client/workspace/proposals/list/?workspace=${workspaceId}`,
      providesTags: ['ListAllProposals'],
    }),

    listQueryProposals: build.query({
      query: queryParams => `/dashboard/client/workspace/proposals/list/${queryParams}`,
      providesTags: ['ListAllProposals'],
    }),

    updateProposal: build.mutation({
      query: body => ({
        url: `/dashboard/client/workspace/job/offer/${body?.id}/status/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['ListAllProposals', 'ListAllProposals', 'GetWorkspaces', 'GetFullAllJobPost'],
    }),

    updateProposalInactiveStatus: build.mutation({
      query: body => ({
        url: `/dashboard/client/workspace/job/skill/${body?.id}/`,
        method: 'PATCH',
        body: {
          is_closed: body.is_closed,
        },
      }),

      invalidatesTags: ['ListAllProposals', 'ListAllProposals', 'GetWorkspaces', 'GetFullAllJobPost'],
    }),

    updateProposalSkill: build.mutation({
      query: body => ({
        url: `/dashboard/client/workspace/job/skill/${body?.id}/`,
        method: 'PATCH',
        body: {
          is_closed: body.is_closed,
        },
      }),

      invalidatesTags: ['GetFullAllJobPost'],
    }),

    getActiveFreelancers: build.query({
      query: workspaceId => `/dashboard/client/workspace/freelancers/list/?workspace=${workspaceId}`,
      providesTags: ['GetActiveFreelancers'],
    }),

    getSearchedFreelancers: build.query({
      query: searchQuery => `/dashboard/client/workspace/freelancers/list/?workspace=${searchQuery.workspaceId}&freelancer=${searchQuery.searchValue}`,
      providesTags: ['GetSearchedFreelancers'],
    }),
  }),
});

export const {
  useListWorkspaceProposalsQuery,
  useUpdateProposalMutation,
  useGetActiveFreelancersQuery,
  useLazyGetSearchedFreelancersQuery,
  useUpdateProposalInactiveStatusMutation,
  useUpdateProposalSkillMutation,
} = freelancersApi;
