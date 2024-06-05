import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Required'),
});

export default validationSchema;
