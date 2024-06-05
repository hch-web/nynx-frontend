import { privateApi } from '.';

export const taskDetailsApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getGigRequirements: build.query({
      query: gigId => `/gig/requirement/?id=${gigId}`,
      providesTags: ['GetGigRequirements'],
    }),
    changeTerms: build.mutation({
      query: body => ({
        url: '/dashboard/freelancer/change/terms/request/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ListChangeTerms'],
    }),
    taskDetails: build.query({
      query: body => `/dashboard/freelancer/workspace/get/task/${body.id}/?task_via=${body.taskVia}`,
      providesTags: ['GetSingleTaskDetails'],
    }),
    listChangeTerms: build.query({
      query: body => `/dashboard/client/list/change/terms/request/?task_id=${body.taskId}&task_via=${body.taskVia}`,
      providesTags: ['ListChangeTerms'],
    }),
    listDeliverables: build.query({
      query: body => `/dashboard/list/task/delivery/requests/?task_via=${body.taskVia}&task_id=${body.taskId}`,
      providesTags: ['ListDeliverables'],
    }),
    updateChangeTermsRequest: build.mutation({
      query: body => ({
        url: `/dashboard/client/change/term/request/status/${body.id}/`,
        method: 'PATCH',
        body: {
          status: body.status,
        },
      }),
      invalidatesTags: ['ListChangeTerms'],
    }),
    updateFeedback: build.mutation({
      query: body => ({
        url: `/dashboard/client/workspace/feedback/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['ListDeliverables'],
    }),
    deliverWork: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('remarks', body.remarks);

        for (let i = 0; i < body.attachments.length; i += 1) {
          formData.append(`attachments[${i}]file`, body.attachments[i].file);
        }

        if (body?.job_offer_task) {
          formData.append('job_offer_task', body.job_offer_task);
        } else if (body?.client_order_task) {
          formData.append('client_order_task', body.client_order_task);
        }

        return {
          url: '/dashboard/freelancer/task/delivery/request/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['ListDeliverables'],
    }),
    requestRevision: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('remarks', body.remarks);
        formData.append('task_deliverable', body.task_deliverable);

        for (let i = 0; i < body.attachments.length; i += 1) {
          formData.append(`attachments[${i}]file`, body.attachments[i].file);
        }

        return {
          url: '/dashboard/client/revision/request/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['ListDeliverables'],
    }),
    acceptDelivery: build.mutation({
      query: body => ({
        url: `/dashboard/client/accept/delivery/request/${body.taskId}/?task_via=${body.taskVia}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['ListDeliverables', 'GetSingleTaskDetails'],
    }),
    listTaskDetails: build.query({
      query: body => `/dashboard/workspace/task/details/?task_via=${body.taskVia}&task_id=${body.taskId}`,
      providesTags: 'ListTaskDetails',
    }),
    freelancerFeedback: build.mutation({
      query: body => ({
        url: '/dashboard/give/freelancer/feedback/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ListDeliverables', 'GetSingleTaskDetails'],
    }),
    clientFeedback: build.mutation({
      query: body => ({
        url: '/dashboard/give/client/feedback/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ListDeliverables', 'GetSingleTaskDetails'],
    }),
    updateClientFeedback: build.mutation({
      query: body => ({
        url: `/dashboard/freelancer/update/client/feedback/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['ListDeliverables'],
    }),
  }),
});

export const {
  useChangeTermsMutation,
  useTaskDetailsQuery,
  useListChangeTermsQuery,
  useUpdateChangeTermsRequestMutation,
  useDeliverWorkMutation,
  useRequestRevisionMutation,
  useListDeliverablesQuery,
  useAcceptDeliveryMutation,
  useUpdateFeedbackMutation,
  useListTaskDetailsQuery,
  useFreelancerFeedbackMutation,
  useClientFeedbackMutation,
  useGetGigRequirementsQuery,
  useUpdateClientFeedbackMutation
} = taskDetailsApi;
