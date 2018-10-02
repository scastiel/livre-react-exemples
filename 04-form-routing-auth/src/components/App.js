import React, { Component } from 'react'
import ExpenseForm from './ExpenseForm'
import SignUpForm from './SignUpForm'

class App extends Component {
  state = {
    expenses: [],
    nextExpenseId: 0
  }
  createExpense = (expense, callback) => {
    this.setState({
      expenses: [
        { id: this.state.nextExpenseId, ...expense },
        ...this.state.expenses
      ],
      nextExpenseId: this.state.nextExpenseId + 1
    })
    callback()
  }
  render() {
    return (
      <div>
        <SignUpForm />
        <ExpenseForm onSubmit={this.createExpense} />
        <ul>
          {this.state.expenses.map(expense => (
            <li key={expense.id}>
              {expense.title}: {expense.amount} € spent on{' '}
              {new Date(expense.date).toDateString()}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
