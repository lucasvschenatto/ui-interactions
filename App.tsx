import React from 'react'
import Navigator from './src/Navigator'
import { createAppContainer } from 'react-navigation'
import Store from './src/store/Store'
import data from './src/data/data'

export default () =>{
  const AppContainer = createAppContainer(Navigator)
  loadDummytData()
  return (
    <AppContainer/>
  )
}

const loadDummytData = () =>{
  const store = new Store()
  store.setAttendances(data)
}