import React, { Component, Fragment } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import emailValidator from 'email-validator'
import firebase from 'firebase/app'

class SignUpForm extends Component {
  state = {
    hasError: false
  }
  render() {
    const { hasError } = this.state
    return (
      <Fragment>
        <h2>Sign up</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordRepeat: ''
          }}
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Please enter your e-mail address.'
            } else if (!emailValidator.validate(values.email)) {
              errors.email = 'Please enter a valid e-mail address.'
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
          onSubmit={async (values, { setSubmitting }) => {
            const { email, password } = values
            this.setState({ hasError: false })
            try {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
            } catch (err) {
              console.error(err)
              this.setState({ hasError: true })
              setSubmitting(false)
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className="signup-form" onSubmit={handleSubmit}>
              <label>
                User name:
                <Field type="email" name="email" />
                <ErrorMessage name="email" className="error" component="span" />
              </label>
              <label>
                Password:
                <Field type="password" name="password" />
                <ErrorMessage
                  name="password"
                  className="error"
                  component="span"
                />
              </label>
              <label>
                Password (repeat):
                <Field type="password" name="passwordRepeat" />
                <ErrorMessage
                  name="passwordRepeat"
                  className="error"
                  component="span"
                />
              </label>
              <footer>
                <button
                  type="submit"
                  className="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing up…' : 'Sign up'}
                </button>
              </footer>
              {hasError && (
                <p>
                  <span className="error">Something wrong happened.</span>
                </p>
              )}
            </form>
          )}
        </Formik>
      </Fragment>
    )
  }
}

export default SignUpForm
