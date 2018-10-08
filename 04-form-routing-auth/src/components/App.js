import React, { Component, Fragment } from 'react'
import ExpenseForm from './ExpenseForm'

class App extends Component {
  state = {
    expenses: [],
    nextExpenseId: 0,
    isCreatingExpense: false,
    currentlyEditedExpense: null
  }
  showCreationForm = () => {
    this.setState({ isCreatingExpense: true })
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
  showEditionForm = expense => {
    this.setState({ currentlyEditedExpense: expense })
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
  onCreateExpenseCancel = () => {
    this.setState({ isCreatingExpense: false })
  }
  onUpdateExpenseCancel = () => {
    this.setState({ currentlyEditedExpense: null })
  }
  render() {
    if (this.state.isCreatingExpense) {
      return (
        <Fragment>
          <h2>Create a new expense</h2>
          <ExpenseForm
            onSubmit={this.createExpense}
            onCancel={this.onCreateExpenseCancel}
          />
        </Fragment>
      )
    }
    if (this.state.currentlyEditedExpense) {
      return (
        <Fragment>
          <h2>Edit expense</h2>
          <ExpenseForm
            expense={this.state.currentlyEditedExpense}
            onSubmit={this.updateExpense}
            onCancel={this.onUpdateExpenseCancel}
          />
        </Fragment>
      )
    }
    return (
      <Fragment>
        <h2>Expenses</h2>
        <button className="primary" onClick={this.showCreationForm}>
          Create
        </button>
        {this.state.expenses.length > 0 ? (
          <ul>
            {this.state.expenses.map(expense => (
              <li key={expense.id}>
                <button onClick={() => this.showEditionForm(expense)}>
                  Edit
                </button>
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
}

export default App
