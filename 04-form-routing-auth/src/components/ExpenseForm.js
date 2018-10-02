import React from 'react'
import { Formik } from 'formik'

const ExpenseForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        date: new Date()
          .toISOString()
          .split('T')
          .shift(),
        amount: 0,
        notes: ''
      }}
      validate={values => {
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
      }}
      onSubmit={(expense, { setSubmitting, resetForm }) => {
        onSubmit(expense, () => {
          resetForm()
          setSubmitting(false)
        })
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form className="expense-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {errors.title &&
              touched.title && <span className="error">{errors.title}</span>}
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
            />
            {errors.date &&
              touched.date && <span className="error">{errors.date}</span>}
          </label>
          <label>
            Amount (€):
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.amount}
            />
            {errors.amount &&
              touched.amount && <span className="error">{errors.amount}</span>}
          </label>
          <label>
            Description:
            <textarea
              name="notes"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.notes}
            />
            {errors.notes &&
              touched.notes && <span className="error">{errors.notes}</span>}
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating…' : 'Create'}
          </button>
        </form>
      )}
    </Formik>
  )
}

export default ExpenseForm
