import { privateApi } from '.';

export const buyerRequestApi = privateApi.injectEndpoints({
  endpoints: build => ({
    listBuyerRequests: build.query({
      query: body => `/dashboard/freelancer/jobs/list/?offset=${body.offset}&limit=${body.limit}${
        body.search ? `&search=${body.search}` : ''
      }${body.category ? `&job_skills__category=${body.category}` : ''}${
        body.subcategory ? `&job_skills__sub_category=${body.subcategory}` : ''
      }${body.job ? `&job_skills__budget_type=${body.job}` : ''}${
        body.min ? `&min_price=${body.min}` : ''
      }${body.max ? `&max_price=${body.max}` : ''}`,
      providesTags: ['ListBuyerRequests'],
    }),
    searchBuyerRequest: build.query({
      query: body => `/dashboard/freelancer/jobs/list/?offset=${body.offset}&limit=${body.limit}&search=${body.search}`,
    }),
  }),
});

export const { useLazyListBuyerRequestsQuery, useLazySearchBuyerRequestQuery } = buyerRequestApi;
