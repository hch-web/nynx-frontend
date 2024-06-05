import * as yup from 'yup';

export const privacyPolicyFormInitVals = {
  privacy_policy: '',
};

export const privacyPolicyFormValSchema = yup.object({
  privacy_policy: yup.string().required('Required'),
});
