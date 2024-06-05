import { publicApi } from 'services/public';

export const singleServicesApi = publicApi.injectEndpoints({
  endpoints: build => ({
    singleServicesFaq: build.query({
      query: () => '/subcategoriespage/get/subcategories/frequently/asked/questions/',
    }),

    getSubCategoryById: build.query({
      query: id => `/asset/list/subcategory/and/category/?sub_category_id=${id}`,
    }),
  }),
});

export const { useSingleServicesFaqQuery, useGetSubCategoryByIdQuery } = singleServicesApi;
