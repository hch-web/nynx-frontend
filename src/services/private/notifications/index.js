import { privateApi } from '..';

export const notificationApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getNotifications: build.query({
      query: body => `/notification/list/?limit=${body?.limit}&offset=${body?.offset ?? 0}`,
      providesTags: ['GetUserNotifications'],
    }),

    readNotification: build.mutation({
      query: body => ({
        url: `/notification/update/${body.id}/`,
        method: 'PATCH',
        body: { is_read: body.isRead, is_delete: false },
      }),
      invalidatesTags: ['GetUserNotifications'],
    }),

    readAllNotifications: build.mutation({
      query: () => ({
        url: '/notification/read-all/',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLazyGetNotificationsQuery, useReadNotificationMutation, useReadAllNotificationsMutation } = notificationApi;
