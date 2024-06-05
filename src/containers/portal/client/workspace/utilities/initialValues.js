import { PROJECT_BASED } from 'utilities/constants';

export const jobPostingSkillsFormInitValues = {
  title: '',
  category: '',
  sub_category: '',
  specializations: [],
  budget_type: PROJECT_BASED,
  budget_amount: '',
  timeline: '',
  categoryLabel: '',
};

export const workspaceFormInitialValues = {
  title: '',
  description: '',
  budget: '',
};

export const taskDetailsBudgetTimeModalInitVal = { rates: '', timeline: '' };

export const taskDetailsRefundModalInitVal = { amount: '' };

export const taskDeliveryModalInitVal = {
  attachments: [],
  remarks: '',
};

export const jobPostInitialValues = {
  title: '',
  description: '',
  skills: [],
  attachments: [],
};

export const updateFeedbackInitialValues = {
  rating: 0,
  description: '',
};

export const requirementInitialValues = {
  description: '',
  attachments: [],
};
