import { privateApi } from 'services/private';

export const gigApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getOverViewData: build.query({
      query: id => `/gig/overview/${id}`,
      providesTags: ['GetOverviewData'],
    }),
    listCategories: build.query({
      query: () => '/asset/category/',
    }),
    listSubCategories: build.query({
      query: id => `/asset/subcategory/?id=${id}`,
    }),
    getSubCategories: build.query({
      query: id => `/asset/attribute_type/?id=${id || ''}`,
    }),
    listAttributes: build.query({
      query: id => `/asset/attribute/?id=${id}`,
    }),
    addOveriewTabPayload: build.mutation({
      query: body => ({
        url: '/gig/overview/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetOverviewData'],
    }),
    updateOveriewTab: build.mutation({
      query: body => ({
        url: `/gig/overview/${body.gig}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetOverviewData', 'GetGigList'],
    }),
    addRequirementTabPayload: build.mutation({
      query: body => ({
        url: '/gig/requirement/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetOverViewDataQuery,
  useListCategoriesQuery,
  useLazyListSubCategoriesQuery,
  useLazyListAttributesQuery,
  useLazyGetSubCategoriesQuery,
  useAddOveriewTabPayloadMutation,
  useAddRequirementTabPayloadMutation,
  useUpdateOveriewTabMutation
} = gigApi;
