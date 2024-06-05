import { publicApi } from 'services/public';

export const forClientsApi = publicApi.injectEndpoints({
  endpoints: build => ({
    heroSection: build.query({
      query: () => '/howitworks/get/header/for/client/page/',
    }),
    howItWorkForClientFirstStep: build.query({
      query: () => '/howitworks/get/how/it/works/for/client/create/workspace/',
    }),
    howItWorkForClientSecondStep: build.query({
      query: () => '/howitworks/get/how/it/works/for/client/build/team/',
    }),
    howItWorkForClientThirdStep: build.query({
      query: () => '/howitworks/get/how/it/works/for/client/manage/task/component/',
    }),
    howItWorksFrequentlyAskedQuestions: build.query({
      query: () => '/howitworks/get/how/it/works/for/client/frequently/asked/questions/',
    }),
  }),
});

export const {
  useHeroSectionQuery,
  useHowItWorkForClientFirstStepQuery,
  useHowItWorkForClientSecondStepQuery,
  useHowItWorkForClientThirdStepQuery,
  useHowItWorksFrequentlyAskedQuestionsQuery,
} = forClientsApi;
