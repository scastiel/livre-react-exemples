import React, { Component, Fragment } from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import ExpenseForm from './ExpenseForm'

class Expense extends Component {
  renderDetails = () => {
    const { expense } = this.props
    return (
      <Fragment>
        <h2>Expense details</h2>
        <Link to="/" className="button">
          Back
        </Link>
        <Link to={`/${expense.id}/edit`} className="button primary">
          Edit
        </Link>
        <p>
          Title: <strong>{expense.title}</strong>
        </p>
        <p>
          Date: <strong>{expense.date}</strong>
        </p>
        <p>
          Amount: <strong>{expense.amount}</strong> €
        </p>
        <p>
          Notes: <strong>{expense.notes}</strong>
        </p>
      </Fragment>
    )
  }
  renderEdit = ({ history, match }) => {
    const { expense, updateExpense } = this.props
    return (
      <Fragment>
        <h2>Edit expense</h2>
        <ExpenseForm
          expense={expense}
          onSubmit={async expenseInfos => {
            await updateExpense(expenseInfos)
            history.push(`/${expense.id}`)
          }}
          onCancel={() => {
            history.push(`/${expense.id}`)
          }}
        />
      </Fragment>
    )
  }
  renderNotFound = ({ match }) => {
    const { expense } = this.props
    return (
      <Fragment>
        <p>Nothing here…</p>
        <Link to={`/${expense.id}`} className="button">
          Go back to expense details
        </Link>
      </Fragment>
    )
  }
  render() {
    const { match } = this.props
    return (
      <Switch>
        <Redirect exact from={`${match.path}`} to={`${match.path}/details`} />
        <Route
          exact
          path={`${match.path}/details`}
          render={this.renderDetails}
        />
        <Route exact path={`${match.path}/edit`} render={this.renderEdit} />
        <Route render={this.renderNotFound} />
      </Switch>
    )
  }
}

export default Expense
