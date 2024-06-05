import { privateApi } from '.';

export const profileApi = privateApi.injectEndpoints({
  endpoints: build => ({
    listSocialMedia: build.query({
      query: () => '/asset/media/',
      providesTags: ['UserConnectedSocialMedia'],
    }),
    profileCompleteStatus: build.query({
      query: () => '/dashboard/freelancer/progress/',
    }),
    addSocialMedia: build.mutation({
      query: body => ({
        url: '/profile/social/media/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserConnectedSocialMedia'],
    }),
    disconnectSocialMedia: build.mutation({
      query: id => ({
        url: `/profile/social/media/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserConnectedSocialMedia'],
    }),
    getUser: build.query({
      query: userId => `/auth/user/detail/${userId}`,
      providesTags: ['GetUserInfo'],
    }),
    getSkillsEducation: build.query({
      query: id => `/profile/skill/education/${id}/`,
      providesTags: ['GetSkillsEducation'],
    }),
    addSkill: build.mutation({
      query: body => ({
        url: '/profile/skill/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetSkillsEducation'],
    }),
    deleteSkill: build.mutation({
      query: id => ({
        url: `/profile/skill/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetSkillsEducation'],
    }),
    getEducation: build.query({
      query: id => `/profile/education/${id}/`,
      providesTags: ['GetEducation'],
    }),
    updateEducation: build.mutation({
      query: body => ({
        url: `/profile/education/${body.id}/`,
        method: 'PUT',
        body: {
          institute: body.institute,
          title: body.title,
          year: body.year,
          profile: body.profile,
        },
      }),
      invalidatesTags: ['GetSkillsEducation', 'GetEducation'],
    }),
    addEducation: build.mutation({
      query: body => ({
        url: '/profile/education/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetSkillsEducation'],
    }),
    deleteEducation: build.mutation({
      query: id => ({
        url: `/profile/education/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetSkillsEducation'],
    }),
    addProfileAboutInfo: build.mutation({
      query: body => ({
        url: '/profile/update/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetUserInfo', 'FetchUserDetails'],
    }),
    getUserTemplates: build.query({
      query: id => `/profile/template/?profile_id=${id}`,
      providesTags: ['GetUserTemplates'],
    }),
    getTemplate: build.query({
      query: id => `/profile/template/${id}/`,
      providesTags: ['GetTemplate'],
    }),
    addTemplate: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('title', body.jobTitle);
        formData.append('description', body.jobDescription);
        formData.append('profile', body.profile);

        for (let i = 0; i < body.images.length; i += 1) {
          formData.append(`images[${i}]image`, body.images[i].image);
        }

        return {
          url: '/profile/template/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['GetUserTemplates'],
    }),
    deleteTemplate: build.mutation({
      query: id => ({
        url: `/profile/template/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetUserTemplates'],
    }),
    editTemplate: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('title', body.jobTitle);
        formData.append('description', body.jobDescription);
        formData.append('profile', body.profile);

        for (let i = 0; i < body.images.length; i += 1) {
          formData.append(`images[${i}]image`, body.images[i].image);
        }

        return {
          url: `/profile/template/${body.id}/`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['GetUserTemplates', 'GetTemplate'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useAddSkillMutation,
  useAddEducationMutation,
  useDeleteSkillMutation,
  useDeleteEducationMutation,
  useAddProfileAboutInfoMutation,
  useAddSocialMediaMutation,
  useListSocialMediaQuery,
  useLazyListSocialMediaQuery,
  useDisconnectSocialMediaMutation,
  useGetSkillsEducationQuery,
  useAddTemplateMutation,
  useGetUserTemplatesQuery,
  useGetTemplateQuery,
  useDeleteTemplateMutation,
  useEditTemplateMutation,
  useGetEducationQuery,
  useUpdateEducationMutation,
  useProfileCompleteStatusQuery
} = profileApi;
