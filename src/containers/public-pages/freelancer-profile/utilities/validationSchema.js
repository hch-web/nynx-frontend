import * as yup from 'yup';

export const skillValidationSchema = yup.object({
  name: yup.string().trim().max(20, 'Name cannot contain more than 20 characters').required('Required'),
  level: yup.string().trim().required('Required'),
});

export const educationValidationSchema = yup.object({
  institute: yup.string().trim().required('Required'),
  title: yup.string().trim().required('Required'),
  year: yup.number().min(1950, 'Year Should be greater than 1950').required('Required '),
});

export const aboutAddValidationSchema = yup.object({
  tagLine: yup.string().trim().required('Required'),
  description: yup.string().trim().required('Required'),
});

export const aboutUpdateValidationSchema = yup.object({
  tagLine: yup.string().trim().required('Required'),
  description: yup.string().trim().required('Required'),
});

export const addTemplateValidationSchema = yup.object({
  jobTitle: yup.string().trim().required('Required'),
  jobDescription: yup.string().trim().required('Required'),
  images: yup.array().min(1, 'Required'),
});

export const editTemplateValidationSchema = yup.object({
  jobTitle: yup.string().trim().required('Required'),
  jobDescription: yup.string().trim().required('Required'),
  images: yup.array().min(1, 'Required'),
});

export const aboutInfoValidationSchema = yup.object({
  firstName: yup.string().trim().max(10, 'Maximum 10 characters allowed!').required('Required'),
  lastName: yup.string().trim().required('Required'),
});
