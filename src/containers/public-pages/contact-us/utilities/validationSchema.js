import * as yup from 'yup';

export const contactUsValidationSchema = yup.object({
  first_name: yup.string().trim().required('Required'),
  last_name: yup.string().trim().required('Required'),
  subject: yup.string().trim().required('Required'),
  description: yup.string().trim().required('Required'),
  report_images: yup.array().min(1, 'Required'),
});

export const named = {};
