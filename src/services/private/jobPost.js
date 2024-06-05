import { privateApi } from '.';

export const jobPostApi = privateApi.injectEndpoints({
  endpoints: build => ({
    listJobPosts: build.query({
      query: () => '/dashboard/client/job/post/',
      providesTags: ['GetAllJobPost'],
    }),
    listCompleteJobPosts: build.query({
      query: id => `/dashboard/client/workspace/jobs/list/?workspace=${id}`,
      providesTags: ['GetFullAllJobPost'],
    }),
    getJobPost: build.query({
      query: id => `/dashboard/client/job/post/${id}/`,
      providesTags: ['GetJobPost'],
    }),
    updateJobPost: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        formData.append('workspace', body.workspace);

        for (let i = 0; i < body.skills.length; i += 1) {
          if (body.skills[i]?.id) {
            formData.append(`skills[${i}]id`, body.skills[i].id);
          }

          formData.append(`skills[${i}]title`, body.skills[i].title);
          formData.append(`skills[${i}]category`, body.skills[i].category);
          formData.append(`skills[${i}]sub_category`, body.skills[i].sub_category);
          formData.append(`skills[${i}]budget_type`, body.skills[i].budget_type);
          formData.append(`skills[${i}]budget_amount`, body.skills[i].budget_amount);
          formData.append(`skills[${i}]timeline`, body.skills[i].timeline);

          // SPECIALIZATION LIST LOOP
          for (let z = 0; z < body.skills[i].specializations.length; z += 1) {
            formData.append(`skills[${i}]specializations[${z}]name`, body.skills[i].specializations[z].name);
          }
        }

        for (let i = 0; i < body.attachments.length; i += 1) {
          formData.append(`attachments[${i}]file`, body.attachments[i]);
        }

        return {
          url: `/dashboard/client/job/post/${body.jobId}/`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['GetAllJobPost', 'GetJobPost', 'GetFullAllJobPost'],
    }),
    deleteJobPost: build.mutation({
      query: id => ({ url: `/dashboard/client/job/post/${id}/`, method: 'DELETE' }),
      invalidatesTags: ['GetAllJobPost', 'GetJobPost', 'GetFullAllJobPost'],
    }),
    createJobPost: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);

        for (let i = 0; i < body.skills.length; i += 1) {
          formData.append(`skills[${i}]title`, body.skills[i].title);
          formData.append(`skills[${i}]category`, body.skills[i].category);
          formData.append(`skills[${i}]sub_category`, body.skills[i].sub_category);
          formData.append(`skills[${i}]budget_type`, body.skills[i].budget_type);
          formData.append(`skills[${i}]budget_amount`, body.skills[i].budget_amount);
          formData.append(`skills[${i}]timeline`, body.skills[i].timeline);

          // SPECIALIZATION ARRAY OF OBJECTS LOOP
          for (let z = 0; z < body.skills[i].specializations.length; z += 1) {
            formData.append(`skills[${i}]specializations[${z}]name`, body.skills[i].specializations[z].name);
          }
        }

        for (let i = 0; i < body.attachments.length; i += 1) {
          formData.append(`attachments[${i}]file`, body.attachments[i]);
        }

        return {
          url: '/dashboard/client/job/post/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [
        'GetAllJobPost',
        'GetJobPost',
        'GetFullAllJobPost',
        'ListBuyerRequests',
        'GetWorkspaces',
      ],
    }),
    renewJobPost: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        formData.append('workspace', body.workspace);

        for (let i = 0; i < body.skills.length; i += 1) {
          formData.append(`skills[${i}]title`, body.skills[i].title);
          formData.append(`skills[${i}]category`, body.skills[i].category);
          formData.append(`skills[${i}]sub_category`, body.skills[i].sub_category);
          formData.append(`skills[${i}]budget_type`, body.skills[i].budget_type);
          formData.append(`skills[${i}]budget_amount`, body.skills[i].budget_amount);
          formData.append(`skills[${i}]timeline`, body.skills[i].timeline);

          // SPECIALIZATION ARRAY OF OBJECTS LOOP
          for (let z = 0; z < body.skills[i].specializations.length; z += 1) {
            formData.append(`skills[${i}]specializations[${z}]name`, body.skills[i].specializations[z].name);
          }
        }

        for (let i = 0; i < body.attachments.length; i += 1) {
          formData.append(`attachments[${i}]file`, body.attachments[i]);
        }

        return {
          url: '/dashboard/client/workspace/renew/job/workspace/',
          method: 'POST',
          body: formData,
        };
      },

      invalidatesTags: [
        'GetAllJobPost',
        'GetJobPost',
        'GetFullAllJobPost',
        'ListBuyerRequests',
        'GetWorkspaces',
      ],
    }),
    updateSkill: build.mutation({
      query: body => ({
        url: `/dashboard/client/workspace/job/skill/${body?.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['GetAllJobPost', 'GetFullAllJobPost'],
    }),
    closeJobPost: build.mutation({
      query: id => ({
        url: `/dashboard/client/job/post/${id}/status/`,
        method: 'PATCH',
        body: {
          is_closed: true,
        },
      }),
      invalidatesTags: ['GetFullAllJobPost'],
    }),
  }),
});

export const {
  useCreateJobPostMutation,
  useListJobPostsQuery,
  useDeleteJobPostMutation,
  useGetJobPostQuery,
  useUpdateJobPostMutation,
  useListCompleteJobPostsQuery,
  useUpdateSkillMutation,
  useRenewJobPostMutation,
  useCloseJobPostMutation
} = jobPostApi;
