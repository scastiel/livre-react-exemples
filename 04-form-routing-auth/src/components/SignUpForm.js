import React from 'react'
import { Formik, Field, ErrorMessage } from 'formik'

const SignUpForm = () => (
  <Formik
    initialValues={{
      username: '',
      password: '',
      passwordRepeat: ''
    }}
    validate={values => {
      const errors = {}
      if (!values.username) {
        errors.username = 'Please enter a user name.'
      } else if (!values.username.match(/^[a-z][a-z0-9_\-.]{2,15}$/i)) {
        errors.username = 'Please enter a valid user name.'
      }
      if (!values.password) {
        errors.password = 'Please enter a password.'
      } else if (values.password.length < 8) {
        errors.password = 'Password must contain at least 8 characters.'
      }
      if (!values.passwordRepeat) {
        errors.passwordRepeat = 'Please enter the same password again.'
      } else if (values.passwordRepeat !== values.password) {
        errors.passwordRepeat = 'The passwords don’t match.'
      }
      return errors
    }}
    onSubmit={values => {
      console.log(values)
    }}
  >
    {({ handleSubmit, isSubmitting }) => (
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          User name:
          <Field type="text" name="username" />
          <ErrorMessage name="username" className="error" component="span" />
        </label>
        <label>
          Password:
          <Field type="password" name="password" />
          <ErrorMessage name="password" className="error" component="span" />
        </label>
        <label>
          Password:
          <Field type="password" name="passwordRepeat" />
          <ErrorMessage
            name="passwordRepeat"
            className="error"
            component="span"
          />
        </label>
        <button type="submit">Sign up</button>
      </form>
    )}
  </Formik>
)

export default SignUpForm
