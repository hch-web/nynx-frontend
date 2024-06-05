import { privateApi } from '..';

export const freelancerOfferApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getOfferJobPostDetails: build.query({
      query: id => `/dashboard/freelancer/job/${id}/details/`,
    }),

    sendProposalOffer: build.mutation({
      query: body => {
        const formData = new FormData();

        Object.keys(body).forEach(key => {
          formData.append(key, body[key]);
        });

        return {
          url: '/dashboard/freelancer/job/offer/create/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['ListBuyerRequests', 'GetSubmitedProposals'],
    }),
  }),
});

export const { useGetOfferJobPostDetailsQuery, useSendProposalOfferMutation } = freelancerOfferApi;
