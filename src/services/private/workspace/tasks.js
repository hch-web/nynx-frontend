import { privateApi } from '..';

export const tasksAPi = privateApi.injectEndpoints({
  endpoints: build => ({
    listTasks: build.query({
      query: workspaceId => `/dashboard/client/workspace/tasks/list/?workspace=${workspaceId}`,
      providesTags: ['GetAllWorkspaces'],
    }),
    freelancerTasksList: build.query({
      query: workspaceId => `/dashboard/freelancer/workspace/tasks/list/?workspace=${workspaceId}`,
    }),
  }),
});

export const { useListTasksQuery, useFreelancerTasksListQuery } = tasksAPi;
