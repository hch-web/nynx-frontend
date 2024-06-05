import { privateApi } from '.';

export const requirementsApi = privateApi.injectEndpoints({
  endpoints: build => ({
    sendRequirements: build.mutation({
      query: requirements => {
        const payload = requirements?.gigRequirements?.map(item => ({
          requirement: item?.id,
          attachments: [],
          job_offer_id: requirements?.taskId,
          task_via: requirements?.taskVia
        }));

        return {
          url: '/gig/create/requirement/',
          method: 'POST',
          body: { obj_list: payload },
        };
      },
    }),

    clientRequirementsList: build.query({
      query: body => ({
        url: `/gig/requirment/answer/?gig_id=${body.gigId}&task_via=${body.orderVia}&job_offer_id=${body.taskId}`,
      }),
      providesTags: ['GetClientRequirements'],
    }),

    updateSingleRequirement: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('description', body.description);
        formData.append('requirement', body.requirement);

        for (let i = 0; i < body?.attachments?.length; i += 1) {
          formData.append(`attachments[${i}]attachment`, body?.attachments[i]);
        }

        return {
          url: `/gig/requirment/answer/${body.id}/`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['GetClientRequirements'],
    }),

    getSingleRequirement: build.query({
      query: id => `/gig/requirment/answer/${id}/`,
    }),
  }),
});

export const {
  useSendRequirementsMutation,
  useClientRequirementsListQuery,
  useUpdateSingleRequirementMutation,
  useGetSingleRequirementQuery,
  useLazyGetSingleRequirementQuery,
} = requirementsApi;
