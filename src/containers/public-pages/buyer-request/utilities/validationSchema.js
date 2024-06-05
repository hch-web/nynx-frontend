import * as yup from 'yup';

export const buyerRequestFormValidationSchema = yup.object({
  job_skill: yup.number().required('Required'),
  gig: yup.number().required('Required'),
  description: yup.string().trim().required('Required'),
  budget_type: yup.string().required('Required'),
  rates: yup.number().required('Required'),
  timeline: yup.number().required('Required'),
});

export const minMaxFormValidationSchema = yup.object({
  min: yup.number().min(0, 'value must be positive').required('Required'),
  max: yup.number().min(0, 'value must be positive').required('Required'),
});
