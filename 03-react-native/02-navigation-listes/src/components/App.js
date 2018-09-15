import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import ContactsListScreen from './ContactsListScreen'
import ViewContactScreen from './ViewContactScreen'
import store from '../store'

const Navigator = createStackNavigator({
  contactsList: ContactsListScreen,
  viewContact: ViewContactScreen
})

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)
