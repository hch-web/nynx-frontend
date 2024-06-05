import { ADHOC, MONTHLY } from 'utilities/constants';
import { publicApi } from '..';

export const gigSearchApi = publicApi.injectEndpoints({
  endpoints: build => ({
    getGigSearchList: build.query({
      query: body => ({
        url: '/gig/user/gig/new/list/',
        method: 'GET',
        params: {
          search: body?.search || undefined,
          category: body?.category || undefined,
          profile__seller_level: body?.seller_levels || undefined,
          is_monthly: body?.gig_type === MONTHLY || undefined,
          is_adhoc: body?.gig_type === ADHOC || undefined,
          min_price: Number(body?.min_price) || undefined,
          max_price: Number(body?.max_price) || undefined,
          profile_id: body?.id || undefined,
        },
      }),
    }),
  }),
});

export const { useGetGigSearchListQuery, useLazyGetGigSearchListQuery } = gigSearchApi;
