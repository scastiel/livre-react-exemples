import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import ContactsListScreen from './ContactsListScreen'
import ViewContactScreen from './ViewContactScreen'
import EditContactScreen from './EditContactScreen'
import store from '../store'
import TakePictureScreen from './TakePictureScreen'

const Navigator = createStackNavigator(
  {
    main: createStackNavigator({
      contactsList: ContactsListScreen,
      viewContact: ViewContactScreen,
    }),
    editContact: createStackNavigator({
      editContact: EditContactScreen,
      takePicture: TakePictureScreen,
    }),
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
)

const AppContainer = createAppContainer(Navigator)

export default () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)
