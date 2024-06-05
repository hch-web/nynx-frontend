import { privateApi } from '..';

export const activityApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getPrevMessages: build.query({
      query: id => `/chat/get/workspace/activity/previous/chat/?workspace_id=${id}`,
      providesTags: ['GetPrevMessages'],
    }),
    getActivityMessages: build.query({
      query: body => `/chat/get/workspace/activity/previous/chat/?workspace_id=${body.id}&limit=${body.limit}&offset=${body.offset}`,
      providesTags: ['GetActivityMessages'],
    }),
    sendAttachments: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('file', body.file);

        return {
          url: '/chat/create/attachment/',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetPrevMessagesQuery, useLazyGetActivityMessagesQuery, useSendAttachmentsMutation } = activityApi;
