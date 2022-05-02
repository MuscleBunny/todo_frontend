import { object, string } from 'yup';

export default object().shape({
  email: string().required('Email is required').email("It must be a valid email"),
  password: string().required('Password is required').min(8, "It must be at least 8 characters")
});
