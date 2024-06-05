import { privateApi } from '..';

export const chatApi = privateApi.injectEndpoints({
  endpoints: build => ({
    createRoom: build.mutation({
      query: body => ({
        url: '/chat/create/room/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetAllRooms'],
    }),
    listAllRoomUsers: build.query({
      query: body => `/chat/get/all/rooms/?search=${body?.search || ''}`,
      providesTags: ['GetAllRooms'],
    }),
    listChatMessages: build.query({
      query: body => `/chat/get/room/${body?.id}/previous/chat/?limit=${body?.limit}&offset=${body?.offset}`,
    }),
    sendChatAttachments: build.mutation({
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

export const { useCreateRoomMutation, useLazyListAllRoomUsersQuery, useLazyListChatMessagesQuery, useSendChatAttachmentsMutation } = chatApi;
