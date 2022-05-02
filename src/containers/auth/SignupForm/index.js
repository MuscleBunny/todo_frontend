import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button } from '../../../components/common';
import { InputField } from '../../../components/form';
import AuthActions from '../../../redux/AuthRedux';
import validationSchema from './schema';

const INITIAL_VALUES = {
  email: '',
  username: '',
  password: ''
};

function SignupForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (values) => {
    await dispatch(AuthActions.signup(values.email, values.username, values.password));
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field component={InputField} name="email" label="Email" />
          <Field component={InputField} name="username" label="Username" />
          <Field component={InputField} type="password" name="password" label="Password" />
          <Button mr={2} type="submit">
            Sign Up
          </Button>
          <Button mr={2} type="button" onClick={() => {history.push("/login")}}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
