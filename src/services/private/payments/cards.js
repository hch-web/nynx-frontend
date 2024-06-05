import { privateApi } from '..';

export const cardsApi = privateApi.injectEndpoints({
  endpoints: build => ({
    listCards: build.query({
      query: () => '/payments/get/payment/methods/list/',
      providesTags: ['ListCards'],
    }),

    getCardDetails: build.query({
      query: cardId => `/payments/get/payment/method/?payment_method_id=${cardId}`,
      providesTags: ['GetCard'],
    }),

    addCardDetails: build.mutation({
      query: body => ({
        url: '/payments/create/payment/method/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ListCards'],
    }),

    deleteCard: build.mutation({
      query: id => ({
        url: `/payments/delete/payment/method/?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ListCards'],
    }),

    updateCard: build.mutation({
      query: body => ({
        url: `/payments/update/payment/method/${body.id}`,
      }),
    }),
  }),
});

export const { useListCardsQuery, useGetCardDetailsQuery, useAddCardDetailsMutation, useDeleteCardMutation } = cardsApi;
