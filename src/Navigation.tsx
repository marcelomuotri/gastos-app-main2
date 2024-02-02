import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import AddExpense from './screens/AddExpense'
import LoginScreen from './screens/LoginScreen'
import { iTransaction } from './types'
import AddCategoryScreen from './screens/AddCateogoryScreen'

export type HomeStackParamList = {
  HomeScreen: undefined
  AddExpense: { transactions?: iTransaction[] }
  LoginScreen: undefined
  AddCategory: undefined
}

export default function Navigation() {
  const Stack = createStackNavigator<HomeStackParamList>()

  const globalScreenOptions = {
    headerShown: false,
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
