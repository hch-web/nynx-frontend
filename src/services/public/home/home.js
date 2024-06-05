import { publicApi } from 'services/public';

export const homeApi = publicApi.injectEndpoints({
  endpoints: build => ({
    heroSectionData: build.query({
      query: () => '/home/get/main/page/section/',
    }),
    categoriesList: build.query({
      query: () => '/asset/categories/list/',
    }),
    freelancerReviewSection: build.query({
      query: () => '/home/get/public/client/section/',
    }),
    buildTeamSection: build.query({
      query: () => '/home/get/build/team/',
    }),
    testimonialSection: build.query({
      query: () => '/home/get/testimonial/',
    }),
    findWorkSection: build.query({
      query: () => '/home/get/public/freelancer/section/',
    }),
    reviewSection: build.query({
      query: () => '/home/get/home/page/detail/',
    }),
    frequentlyAskedQuestions: build.query({
      query: () => '/home/get/frequently/asked/question/',
    }),
  }),
});

export const {
  useCategoriesListQuery,
  useHeroSectionDataQuery,
  useBuildTeamSectionQuery,
  useTestimonialSectionQuery,
  useFindWorkSectionQuery,
  useFreelancerReviewSectionQuery,
  useReviewSectionQuery,
  useFrequentlyAskedQuestionsQuery
} = homeApi;
