import { privateApi } from '..';

export const contactUsApi = privateApi.injectEndpoints({
  endpoints: build => ({
    submitContactUsDetails: build.mutation({
      query: body => {
        const formData = new FormData();

        formData.append('first_name', body?.first_name);
        formData.append('last_name', body?.last_name);
        formData.append('description', body?.description);
        formData.append('subject', body?.subject);
        formData.append('order_number', body?.order_number);

        body?.report_images?.map((element, index) => formData.append(`report_images[${index}]file`, element));

        return {
          url: '/helpandsupport/create/report/',
          method: 'POST',
          body: formData,
        };
      },
    }),

    zendexHelpAndSupport: build.mutation({
      query: () => ({
        url: '/auth/zendesk/sso/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useSubmitContactUsDetailsMutation, useZendexHelpAndSupportMutation } = contactUsApi;
