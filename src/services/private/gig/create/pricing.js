import { privateApi } from '../..';

export const pricingApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getFieldsData: build.query({
      query: id => `/asset/feature/?subcategory=${id}`,
      providesTags: ['GetFieldData'],
    }),
    getUpdatedFieldsData: build.query({
      query: id => `/gig/feature/?id=${id}`,
      providesTags: ['GetUpdateFieldData'],
    }),
    addPricing: build.mutation({
      query: body => ({
        url: '/gig/feature/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetFieldData', 'GetUpdateFieldData', 'GetGigList'],
    }),
    updatePricing: build.mutation({
      query: body => ({
        url: `/gig/feature/${body.gig}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetFieldData', 'GetUpdateFieldData', 'GetGigList'],
    }),
  }),
});

export const { useGetFieldsDataQuery, useGetUpdatedFieldsDataQuery, useAddPricingMutation, useUpdatePricingMutation } = pricingApi;
