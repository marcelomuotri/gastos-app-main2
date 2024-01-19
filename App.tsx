import React from 'react'
import { Provider } from 'react-redux'
import store from './src/state/store'
import Navigation from './src/Navigation'
import { ThemeProvider } from '@rneui/themed'
import theme from './src/config/theme'

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </Provider>
  )
}
