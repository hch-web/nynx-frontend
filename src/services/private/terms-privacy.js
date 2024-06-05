import { privateApi } from '.';

export const termsPrivacyApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getPrivacyPolicy: build.query({
      query: () => '/home/privacy-policy/',
      providesTags: ['GetPrivacyPolicy'],
    }),

    addPrivacyPolicy: build.mutation({
      query: body => ({
        url: '/home/privacy-policy/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetPrivacyPolicy'],
    }),

    updatePrivacyPolicy: build.mutation({
      query: body => ({
        url: `/home/privacy-policy/${body.id}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetPrivacyPolicy'],
    }),

    getTermsOfService: build.query({
      query: () => '/home/terms-and-conditions/',
      providesTags: ['GetTermsOfService'],
    }),

    addTermsOfService: build.mutation({
      query: body => ({
        url: '/home/terms-and-conditions/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetTermsOfService'],
    }),

    updateTermsOfService: build.mutation({
      query: body => ({
        url: `/home/terms-and-conditions/${body.id}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GetTermsOfService'],
    }),
  }),
});

export const {
  useAddPrivacyPolicyMutation,
  useAddTermsOfServiceMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsOfServiceQuery,
  useUpdateTermsOfServiceMutation,
} = termsPrivacyApi;
