import { publicApi } from 'services/public';

export const findServicesApi = publicApi.injectEndpoints({
  endpoints: build => ({
    findServicesHeroSection: build.query({
      query: () => '/categoriespage/get/header/for/categories/page/',
    }),
  }),
});

export const { useFindServicesHeroSectionQuery } = findServicesApi;
