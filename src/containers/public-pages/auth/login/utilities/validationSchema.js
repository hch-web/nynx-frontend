import * as yup from 'yup';

const validationSchema = yup.object({
  username_or_email: yup.string().trim().required('Required'),
  password: yup.string().required('Required'),
});

export default validationSchema;
