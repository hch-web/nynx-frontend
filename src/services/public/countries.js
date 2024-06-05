import { publicApi } from '.';

export const countryApi = publicApi.injectEndpoints({
  endpoints: build => ({
    listCountries: build.query({
      query: () => '/asset/list/countries/',
    }),
    listTimeZones: build.query({
      query: id => `/asset/list/country/${id}/timezones/`,
    }),
  }),
});

export const { useListCountriesQuery, useLazyListTimeZonesQuery } = countryApi;
