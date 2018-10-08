import React, { Component } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'

class ExpenseForm extends Component {
  defaultValues = {
    title: '',
    date: new Date()
      .toISOString()
      .split('T')
      .shift(),
    amount: 0,
    notes: ''
  }
  validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Please enter a title.'
    }
    if (!values.date) {
      errors.date = 'Please enter a date.'
    }
    if (!values.amount) {
      errors.amount = 'Please enter a non-zero amount.'
    }
    return errors
  }
  onSubmit = expense => {
    this.props.onSubmit(expense)
  }
  onCancel = event => {
    event.preventDefault()
    this.props.onCancel()
  }
  renderError(name) {
    return <ErrorMessage name={name} component="span" className="error" />
  }
  render() {
    return (
      <Formik
        initialValues={this.props.expense || this.defaultValues}
        validate={this.validate}
        onSubmit={this.onSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className="expense-form" onSubmit={handleSubmit}>
            <label>
              Title:
              <Field type="text" name="title" />
              {this.renderError('title')}
            </label>
            <label>
              Date:
              <Field type="date" name="date" />
              {this.renderError('date')}
            </label>
            <label>
              Amount (€):
              <Field type="number" name="amount" />
              {this.renderError('amount')}
            </label>
            <label>
              Notes:
              <Field component="textarea" name="notes" />
              {this.renderError('notes')}
            </label>
            <footer>
              <button onClick={this.onCancel}>Cancel</button>
              <button className="primary" type="submit">
                {this.props.expense ? 'Update' : 'Create'}
              </button>
            </footer>
          </form>
        )}
      </Formik>
    )
  }
}

export default ExpenseForm
