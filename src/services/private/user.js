import { privateApi } from '.';

export const userApi = privateApi.injectEndpoints({
  endpoints: build => ({
    updateBasicInfo: build.mutation({
      query: body => ({
        url: '/profile/update/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['FetchUserDetails'],
    }),
    switchUser: build.mutation({
      query: body => ({
        url: '/profile/update/',
        method: 'PUT',
        body: {
          is_buyer: body,
        },
      }),
    }),
  }),
});

export const { useUpdateBasicInfoMutation, useSwitchUserMutation } = userApi;
