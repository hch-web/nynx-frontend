import * as yup from 'yup';

export const serviceFiltersInitVals = {
  gig_type: null,
  delivery_time: null,
};
export const serviceFiltersValSchema = yup.object({
  gig_type: yup.string().nullable(),
  delivery_time: yup.string().nullable(),
});
