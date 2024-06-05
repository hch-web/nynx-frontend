import { publicApi } from 'services/public';

export const whyPageApi = publicApi.injectEndpoints({
  endpoints: build => ({
    whyPageHeroSection: build.query({
      query: () => '/about/get/about/page/header/',
    }),
    whyPageValueSection: build.query({
      query: () => '/about/get/about/page/value/proposition/',
    }),
    whyPageAboutNynxSection: build.query({
      query: () => '/about/get/about/page/about/nynx/',
    }),
    whyPageForBothClientFreelancers: build.query({
      query: () => '/about/get/about/page/why/nynx/',
    }),
    whyPageServicesSection: build.query({
      query: () => '/about/get/about/page/service/',
    }),
    whyPageFaq: build.query({
      query: () => '/about/get/about/page/frequently/asked/question/',
    }),
  }),
});

export const {
  useWhyPageHeroSectionQuery,
  useWhyPageValueSectionQuery,
  useWhyPageAboutNynxSectionQuery,
  useWhyPageServicesSectionQuery,
  useWhyPageFaqQuery,
  useWhyPageForBothClientFreelancersQuery
} = whyPageApi;
