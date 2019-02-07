import React, { Component, Fragment } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import emailValidator from 'email-validator'
import firebase from 'firebase/app'
import { withRouter } from 'react-router'

class SignInForm extends Component {
  state = {
    hasError: false
  }
  render() {
    const { location, history } = this.props
    const { hasError } = this.state
    return (
      <Fragment>
        <h2>Sign in</h2>
        <Formik
          initialValues={{
            email: '',
            password: ''
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
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const { email, password } = values
            this.setState({ hasError: false })
            try {
              await firebase.auth().signInWithEmailAndPassword(email, password)
              setSubmitting(false)

              if (location.state) {
                const { from } = location.state
                if (from) {
                  history.push(from)
                }
              }
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
                E-mail address:
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
              <footer>
                <button
                  type="submit"
                  className="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in…' : 'Sign in'}
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

export default withRouter(SignInForm)
