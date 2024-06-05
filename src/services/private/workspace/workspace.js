import { privateApi } from '..';

export const workspaceApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getWorkspaces: build.query({
      query: body => `/dashboard/client/workspace/?status=${body.status}`,
    }),
    getAvailableWorkspacesToHire: build.query({
      query: () => '/dashboard/client/workspace/',
      providesTags: ['GetAvailableWorkspacesToHire'],
    }),
    getFreelancerWorkspacesList: build.query({
      query: body => `/dashboard/freelancer/workspace/list/?status=${body.status}`,
      providesTags: ['GetFreelancerWorkspaces'],
    }),
    getWorkspace: build.query({
      query: id => `/dashboard/client/workspace/${id}/`,
      providesTags: ['GetWorkspace'],
    }),
    getFreelancerWorkspace: build.query({
      query: id => `/dashboard/freelancer/workspace/${id}/retrieve/`,
      providesTags: ['GetWorkspace', 'GetFreelancerWorkspace'],
    }),
    updateWorkspace: build.mutation({
      query: body => ({
        url: `/dashboard/client/workspace/${body.id}/`,
        method: 'PUT',
        body: {
          title: body.title,
        },
      }),
      invalidatesTags: ['GetWorkspaces', 'GetWorkspace', 'GetFullAllJobPost'],
    }),
    deleteWorkspace: build.mutation({
      query: id => ({
        url: `/dashboard/client/workspace/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetWorkspaces', 'GetWorkspace'],
    }),

    createWorkspace: build.mutation({
      query: body => ({
        url: '/dashboard/client/workspace/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetWorkspaces', 'GetWorkspace', 'GetAvailableWorkspacesToHire'],
    }),
    inactiveWorkspace: build.mutation({
      query: body => ({
        url: `/dashboard/client/job/post/${body?.id}/status/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['GetWorkspaces', 'GetWorkspace', 'GetFullAllJobPost'],
    }),
  }),
});

export const {
  useLazyGetWorkspacesQuery,
  useGetAvailableWorkspacesToHireQuery,
  useLazyGetFreelancerWorkspacesListQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery,
  useGetFreelancerWorkspaceQuery,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useInactiveWorkspaceMutation,
} = workspaceApi;
