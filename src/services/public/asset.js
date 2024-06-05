const { publicApi } = require('.');

export const assetApi = publicApi.injectEndpoints({
  endpoints: build => ({
    getCategoriesList: build.query({
      query: () => '/asset/categories/list/',
    }),
  }),
});

export const { useGetCategoriesListQuery } = assetApi;
