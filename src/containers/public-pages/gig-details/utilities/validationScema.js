import * as yup from 'yup';

export const directHireAhocValidation = yup.object({
  workspace: yup.string().required('Required'),
});

export const directHireMonthlyValidation = yup.object({
  workspace: yup.string().required('Required'),
  month: yup.string().required('Required'),
});

export const createWorkspaceValidation = yup.object({
  title: yup.string().trim().required('Required'),
});
