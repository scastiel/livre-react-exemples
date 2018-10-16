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
    isLoadingUser: true,
    user: null
  }

  componentDidMount() {
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user, isLoadingUser: false })
      if (user) {
        this.subscribeToExpenses()
      } else {
        this.setState({ expenses: {} })
        this.unsubscribeToExpenses()
      }
    })
  }

  componentWillUnmount() {
    if (this.unsubscribeAuth) {
      this.unsubscribeAuth()
    }
    this.unsubscribeToExpenses()
  }

  unsubscribeToExpenses() {
    if (this.expensesRef) {
      this.expensesRef.off()
      this.expensesRef = null
    }
  }

  subscribeToExpenses() {
    const uid = this.state.user.uid
    this.expensesRef = firebase.database().ref(`users/${uid}/expenses`)
    this.expensesRef.on('value', snapshot => {
      const expensesById = snapshot.val() || {}
      const expenses = Object.entries(expensesById).map(([id, expense]) => ({
        id,
        ...expense
      }))
      this.setState({ expenses })
    })
  }

  createExpense = async expenseInfos => {
    const uid = this.state.user.uid
    const expenseRef = firebase
      .database()
      .ref(`users/${uid}/expenses`)
      .push()
    await expenseRef.set(expenseInfos)
  }

  updateExpense = async expenseInfos => {
    const uid = this.state.user.uid
    const { id, ...expense } = expenseInfos
    const expenseRef = firebase.database().ref(`users/${uid}/expenses/${id}`)
    await expenseRef.set(expense)
  }

  renderCreateExpenseForm = ({ history }) => {
    return (
      <Fragment>
        <h2>Create a new expense</h2>
        <ExpenseForm
          onSubmit={async expenseInfos => {
            await this.createExpense(expenseInfos)
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
    const expenseId = match.params.id
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
