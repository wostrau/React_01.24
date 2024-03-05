import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import { App } from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store.js'
import { router } from './navigation/router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </RouterProvider>
  </Provider>
)
