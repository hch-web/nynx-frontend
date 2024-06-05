import { publicApi } from 'services/public';
import { ADHOC, COMPLETED, MONTHLY } from 'utilities/constants';

export const services = publicApi.injectEndpoints({
  endpoints: build => ({
    getCategoriesAndSubCatgoriesList: build.query({
      query: () => '/asset/category/and/subcategories/',
    }),
    // getSubCategoryGigList: build.query({
    //   query: body => `/gig/subcategory/${body.subCategoryId}/gigs/?status=${body.status}${
    //     body?.profile_id ? `&profile_id=${body.profile_id}` : ''
    //   }`,
    // }),
    getSubCategoryGigList: build.query({
      query: body => ({
        url: `/gig/subcategory/${body.subCategoryId}/gigs/`,
        method: 'GET',
        params: {
          status: body.status || COMPLETED,
          profile_id: body?.profile_id || undefined,
          is_monthly: body?.gig_type === MONTHLY || undefined,
          is_adhoc: body?.gig_type === ADHOC || undefined,
          delivery_days: body?.delivery_time || undefined,
        },
      }),
    }),
    getSearchedSubCategory: build.query({
      query: body => `/asset/list/categories/?search=${body.search}`,
    }),
  }),
});

export const {
  useGetCategoriesAndSubCatgoriesListQuery,
  useGetSubCategoryGigListQuery,
  useLazyGetSubCategoryGigListQuery,
  useLazyGetSearchedSubCategoryQuery,
} = services;
