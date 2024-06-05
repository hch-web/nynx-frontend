import { privateApi } from '..';

export const addPaymentMethodApi = privateApi.injectEndpoints({
  endpoints: build => ({
    addPaymentMethod: build.mutation({
      query: body => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAddPaymentMethodMutation } = addPaymentMethodApi;
