import * as yup from 'yup';

export const gigFiltersInitValues = {
  gig_type: '',
  seller_levels: '',
  category: '',
};

export const gigFiltersValSchema = yup.object({
  gig_type: yup.string(),
  seller_levels: yup.string(),
  category: yup.string(),
});

export const gigBudgetInitValues = {
  min_price: '',
  max_price: '',
};

export const gigBudgetValSchema = yup.object({
  min_price: yup.string(),
  max_price: yup.string(),
});
