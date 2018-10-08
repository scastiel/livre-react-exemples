import React, { Component, Fragment } from 'react'
import ExpenseForm from './ExpenseForm'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Expense from './Expense'

class App extends Component {
  state = {
    expenses: [],
    nextExpenseId: 0
  }
  saveStateToLocalStorage = () => {
    window.localStorage.setItem('state', JSON.stringify(this.state))
  }
  loadStateFromLocalStorage = () => {
    const stateJSON = window.localStorage.getItem('state')
    if (stateJSON) {
      this.setState(JSON.parse(stateJSON))
    }
  }
  componentDidMount() {
    this.loadStateFromLocalStorage()
  }
  createExpense = expenseInfos => {
    this.setState(
      {
        expenses: [
          { id: this.state.nextExpenseId, ...expenseInfos },
          ...this.state.expenses
        ],
        nextExpenseId: this.state.nextExpenseId + 1
      },
      this.saveStateToLocalStorage
    )
  }
  updateExpense = expenseInfos => {
    const { expenses } = this.state
    const expenseIndex = expenses.findIndex(e => e.id === expenseInfos.id)
    const expensesBefore = expenses.slice(0, expenseIndex)
    const expensesAfter = expenses.slice(expenseIndex + 1)
    this.setState(
      {
        expenses: [...expensesBefore, expenseInfos, ...expensesAfter]
      },
      this.saveStateToLocalStorage
    )
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
  renderExpenseView = ({ match }) => {
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
      <Expense
        match={match}
        expense={expense}
        updateExpense={this.updateExpense}
      />
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
                <Link to={`/${expense.id}`}>
                  {expense.title}: {expense.amount} € spent on{' '}
                  {new Date(expense.date).toDateString()}
                </Link>
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
          <Route path="/:id" render={this.renderExpenseView} />
          <Route render={this.renderNotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
