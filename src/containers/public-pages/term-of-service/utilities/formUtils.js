import * as yup from 'yup';

export const termsOfServiceFormInitVals = {
  terms_and_conditions: '',
};

export const termsOfServiceFormValSchema = yup.object({
  terms_and_conditions: yup.string().required('Required'),
});
