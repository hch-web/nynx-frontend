import { privateApi } from '.';

export const profileApi = privateApi.injectEndpoints({
  endpoints: build => ({
    directHiring: build.mutation({
      query: body => ({
        url: '/gig/client/order/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetSkillsEducation', 'GetFreelancerWorkspaces', 'GetWorkspaces'],
    }),
  }),
});

export const { useDirectHiringMutation } = profileApi;
