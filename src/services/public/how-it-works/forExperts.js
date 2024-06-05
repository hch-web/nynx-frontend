import { publicApi } from 'services/public';

export const forExpertsApi = publicApi.injectEndpoints({
  endpoints: build => ({
    howItWorksExpertHeroSection: build.query({
      query: () => '/howitworksforfreelancer/get/header/for/freelancer/page/',
    }),
    howItWorksExpertsProfiles: build.query({
      query: () => '/howitworksforfreelancer/get/how/it/works/for/freelancer/community/',
    }),
    howItWorksExpertFrequentlyAskedQuestions: build.query({
      query: () => '/howitworksforfreelancer/get/how/it/works/for/freelancer/frequently/asked/questions/',
    }),
    howItWorksExpertReviews: build.query({
      query: () => '/howitworksforfreelancer/get/how/it/works/for/freelancer/public/content/',
    }),
    howItWorksExpertInstructions: build.query({
      query: () => '/howitworksforfreelancer/get/how/it/works/for/freelancer/public/details/',
    }),
  }),
});

export const {
  useHowItWorksExpertHeroSectionQuery,
  useHowItWorksExpertFrequentlyAskedQuestionsQuery,
  useHowItWorksExpertsProfilesQuery,
  useHowItWorksExpertReviewsQuery,
  useHowItWorksExpertInstructionsQuery,
} = forExpertsApi;
