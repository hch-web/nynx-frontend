import { privateApi } from 'services/private';

export const galleryApi = privateApi.injectEndpoints({
  endpoints: build => ({
    getGalleryImages: build.query({
      query: id => `/gig/images/${id}`,
      providesTags: ['GetGalleryImages'],
    }),
    updateGalleryImages: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('gig', body.gig);

        for (let i = 0; i < body.images.length; i += 1) {
          formData.append(`images[${i}]image`, body.images[i].image);
          formData.append(`images[${i}]is_main`, i === 0); // TRUE for first image only else FALSE
        }

        return {
          url: `/gig/images/${body.gig}/`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['GetGalleryImages', 'GetGigList'],
    }),
  }),
});

export const { useGetGalleryImagesQuery, useUpdateGalleryImagesMutation } = galleryApi;
