import { publicApi } from 'services/public';

export const footerApi = publicApi.injectEndpoints({
  endpoints: build => ({
    footerTopSection: build.query({
      query: body => `/home/get/footer/?footer_page=${body?.currentPage ? body?.currentPage : body?.currentPage}`,
    }),
  }),
});

export const {
  useLazyFooterTopSectionQuery
} = footerApi;
