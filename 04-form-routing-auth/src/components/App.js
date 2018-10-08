import React, { Component, Fragment } from 'react'
import ExpenseForm from './ExpenseForm'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class App extends Component {
  state = {
    expenses: [],
    nextExpenseId: 0
  }
  createExpense = expenseInfos => {
    this.setState({
      expenses: [
        { id: this.state.nextExpenseId, ...expenseInfos },
        ...this.state.expenses
      ],
      nextExpenseId: this.state.nextExpenseId + 1,
      isCreatingExpense: false
    })
  }
  updateExpense = expenseInfos => {
    const { expenses } = this.state
    const expenseIndex = expenses.findIndex(e => e.id === expenseInfos.id)
    const expensesBefore = expenses.slice(0, expenseIndex)
    const expensesAfter = expenses.slice(expenseIndex + 1)
    this.setState({
      expenses: [...expensesBefore, expenseInfos, ...expensesAfter],
      currentlyEditedExpense: null
    })
  }
  renderCreateExpenseForm = ({ history }) => {
    return (
      <Fragment>
        <h2>Create a new expense</h2>
        <ExpenseForm
          onSubmit={expenseInfos => {
            this.createExpense(expenseInfos)
            history.push('/')
          }}
          onCancel={() => {
            history.push('/')
          }}
        />
      </Fragment>
    )
  }
  renderEditExpenseForm = ({ history, match }) => {
    const expenseId = parseInt(match.params.id, 10)
    const expense = this.state.expenses.find(e => e.id === expenseId)
    if (!expense) {
      return (
        <Fragment>
          <p>No expense with this ID…</p>
          <Link to="/" className="button">
            Go back to expense list
          </Link>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <h2>Edit expense</h2>
        <ExpenseForm
          expense={expense}
          onSubmit={expenseInfos => {
            this.updateExpense(expenseInfos)
            history.push('/')
          }}
          onCancel={() => {
            history.push('/')
          }}
        />
      </Fragment>
    )
  }
  renderExpensesList = () => {
    return (
      <Fragment>
        <h2>Expenses</h2>
        <Link to="/create" className="button primary">
          Create
        </Link>
        {this.state.expenses.length > 0 ? (
          <ul>
            {this.state.expenses.map(expense => (
              <li key={expense.id}>
                <Link to={`/${expense.id}/edit`} className="button">
                  Edit
                </Link>
                {expense.title}: {expense.amount} € spent on{' '}
                {new Date(expense.date).toDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expense yet.</p>
        )}
      </Fragment>
    )
  }
  renderNotFound = () => {
    return (
      <Fragment>
        <p>Nothing here…</p>
        <Link to="/" className="button">
          Go back to expense list
        </Link>
      </Fragment>
    )
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.renderExpensesList} />
          <Route exact path="/create" render={this.renderCreateExpenseForm} />
          <Route exact path="/:id/edit" render={this.renderEditExpenseForm} />
          <Route render={this.renderNotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
