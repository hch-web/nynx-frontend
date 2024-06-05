import * as yup from 'yup';

export const createWorkspaceValSchema = yup.object({
  title: yup.string().trim().required('Required'),
  description: yup.string().trim().required('Required'),
  budget: yup.number().min(1, 'Budget Should be greater than or equal to 1').required('Required'),
});

export const jobPostingValSchema = yup.object({
  title: yup.string().trim().required('Required'),
  description: yup.string().trim().required('Required'),
  budget: yup.number().required('Required'),
});

export const jobPostingSkillsModalSchema = yup.object({
  title: yup.string().trim().required('Required'),
  category: yup.string().required('Required'),
  sub_category: yup.string().required('Required'),
  specializations: yup.array().min(1, 'Minimum one value Required'),
  budget_type: yup.string().trim().required('Required'),
  budget_amount: yup.number().min(1, 'Value should be greater that 1').required('Required'),
  timeline: yup.number().min(1, 'Value should be greater that 1').required('Required'),
});

export const jobPostingFormSchema = yup.object({
  title: yup.string().trim().required('Required'),
  description: yup.string().trim().required('Required'),
  skills: yup.array().min(1, 'Minimum one value Required'),
  attachments: yup
    .array()
    .min(1, 'Minimum One File Required')
    .test('fileSize', 'Size Should be less than 40mb', files => {
      let valid = true;
      if (files) {
        files.forEach(file => {
          const size = file.size / (1024 * 1024);

          if (size > 40) {
            valid = false;
          }
        });
      }
      return valid;
    }),
});

export const workspaceTitleModalValSchema = yup.object({
  title: yup.string().trim().required('Required'),
});

export const taskDeliveryModalValSchema = yup.object({
  attachments: yup.array().min(1, 'Minimum 1 File Required'),
  remarks: yup.string().trim().required('Required'),
});

export const changeBudgetTimeModalValSchema = yup.object({
  rates: yup
    .number()
    .when('timeline', { is: true, then: yup.number(), otherwise: yup.number().required('Required') }),
  timeline: yup.number(),
});

export const feedbackModalValSchema = yup.object({
  description: yup.string().required('Required'),
});
