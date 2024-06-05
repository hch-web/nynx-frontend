import * as yup from 'yup';

export const overViewTabValidationSchema = yup.object({
  title: yup.string().trim().required('Required').max(80, 'Title should not contain more than 80 character'),
  category: yup.string().required('Required'),
  sub_category: yup.string().required('Required'),
  gig_attribute: yup.array(),
  search_tags: yup.array().min(1, 'Tag list must contain at least 1 tag').max(5, 'Please add Maximum 5 Tags'),
});

export const searchTagsValidationSchema = yup.object({
  tag: yup.string().trim().max(20, 'Tag should not contain more than 20 character'),
});

export const addCustomFieldValidationSchema = yup.object({
  field_name: yup
    .string()
    .trim()
    .required('Required')
    .max(20, 'Title should not contain more than 20 character'),
});

export const FeaturesValidationSchema = yup.object().shape({
  features: yup
    .array()
    .min(1, 'Complete At least 1 Form')
    .of(
      yup.object().shape({
        basic: yup.mixed().when('is_required', {
          is: true,
          then: yup.mixed().required('Required'),
          otherwise: yup.mixed(),
        }),
        standard: yup.mixed().when(['is_required', 'attributes.isthreetier'], {
          is: (isRequired, isthreetier) => isRequired && isthreetier,
          then: yup.mixed().required('Required'),
          otherwise: yup.mixed(),
        }),
        premium: yup.mixed().when(['is_required', 'attributes.isthreetier'], {
          is: (isRequired, isthreetier) => isRequired && isthreetier,
          then: yup.mixed().required('Required'),
          otherwise: yup.mixed(),
        }),
      })
    ),
});

export const galleryTabValidationSchema = yup.object({
  images: yup.array().min(1, 'Please select at least 1 image'),
});

export const requirementsValidationSchema = yup.object({
  requirements: yup.array().min(1, 'You must add at least 1 requirement'),
});

export const requirementValidationSchema = yup.object({
  requirement: yup.string().trim().required('Required'),
});

export const faqValidationSchema = yup.object({
  question: yup.string().trim().required('Required'),
  answer: yup.string().trim().required('Required'),
});

export const descriptionValidation = yup.object({
  description: yup.string().trim().required('Required'),
});
