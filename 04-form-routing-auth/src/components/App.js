import React, { Component, Fragment } from 'react'
import firebase from 'firebase/app'
import ExpenseForm from './ExpenseForm'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'
import Expense from './Expense'
import Signout from './Signout'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

class App extends Component {
  state = {
    expenses: [],
    nextExpenseId: 0,
    isLoadingUser: true,
    user: null
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
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user, isLoadingUser: false })
    })
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth()
    }
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

  renderHeader = () => {
    const { user, isLoadingUser } = this.state
    if (isLoadingUser) {
      return <header>Loading user info…</header>
    }
    if (user) {
      return (
        <header>
          <span>
            Signed in as <strong>{user.email}</strong>.
          </span>
          <span>
            <NavLink to="/signout">Sign out</NavLink>
          </span>
        </header>
      )
    }
    return (
      <header>
        <span>Not logged in.</span>
        <span>
          <NavLink to="/signin">Sign in</NavLink>{' '}
          <NavLink to="/signup">Sign up</NavLink>
        </span>
      </header>
    )
  }

  renderSignout = () => <Signout />
  renderSignup = () => <SignUpForm />
  renderSignin = () => <SignInForm />

  signedInOnly = (render, withRedirect = true) => props => {
    const { user, isLoadingUser } = this.state
    if (isLoadingUser) {
      return <p>Loading…</p>
    }
    if (user) {
      return render(props)
    }
    return (
      <Redirect
        to={{
          pathname: '/signin',
          state: withRedirect ? { from: props.location } : null
        }}
      />
    )
  }

  notSignedInOnly = render => props => {
    const { user, isLoadingUser } = this.state
    if (isLoadingUser) {
      return <p>Loading…</p>
    }
    if (!user) {
      return render(props)
    }
    return <Redirect to="/" />
  }

  render() {
    return (
      <Router>
        <Fragment>
          {this.renderHeader()}
          <Switch>
            <Route
              exact
              path="/signout"
              render={this.signedInOnly(this.renderSignout, false)}
            />
            <Route
              exact
              path="/signup"
              render={this.notSignedInOnly(this.renderSignup)}
            />
            <Route
              exact
              path="/signin"
              render={this.notSignedInOnly(this.renderSignin)}
            />
            <Route
              exact
              path="/"
              render={this.signedInOnly(this.renderExpensesList)}
            />
            <Route
              exact
              path="/create"
              render={this.signedInOnly(this.renderCreateExpenseForm)}
            />
            <Route
              path="/:id"
              render={this.signedInOnly(this.renderExpenseView)}
            />
            <Route render={this.renderNotFound} />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default App
