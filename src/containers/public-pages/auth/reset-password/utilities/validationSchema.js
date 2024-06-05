import * as yup from 'yup';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Required')
    .min(8, 'Password must contain 8 character')
    .test(
      'isValidPass',
      'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number or special',
      value => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumberSymbole = /[0-9]/.test(value) || /[!@#%&]/.test(value);
        if (hasUpperCase && hasLowerCase && hasNumberSymbole) {
          return true;
        }
        return false;
      }
    ),
  reEnterPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default validationSchema;
