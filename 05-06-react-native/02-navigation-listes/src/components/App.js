import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import ContactsListScreen from './ContactsListScreen'
import ViewContactScreen from './ViewContactScreen'
import EditContactScreen from './EditContactScreen'
import store from '../store'

const Navigator = createStackNavigator(
  {
    main: createStackNavigator({
      contactsList: ContactsListScreen,
      viewContact: ViewContactScreen
    }),
    editContact: createStackNavigator({
      editContact: EditContactScreen
    })
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)
