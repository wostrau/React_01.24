import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import './index.css'
import { App } from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.js'
import { router } from './navigation/router.jsx'
//import { theme } from './theme/theme.jsx'

export const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </RouterProvider>
  </Provider>
  // </React.StrictMode>
)
