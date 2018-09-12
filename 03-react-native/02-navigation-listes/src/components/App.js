import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import ContactsListScreen from './ContactsListScreen'
import ViewContactScreen from './ViewContactScreen'

export default createStackNavigator({
  contactsList: ContactsListScreen,
  viewContact: ViewContactScreen
})
