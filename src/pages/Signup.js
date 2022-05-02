import React from 'react';
import AuthLayout from '../containers/layout/AuthLayout';
import SignupForm from '../containers/auth/SignupForm';

function Login() {
  return (
    <AuthLayout title="Sign Up">
      <SignupForm />
    </AuthLayout>
  );
}

export default Login;
