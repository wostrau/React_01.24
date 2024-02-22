import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import { App } from './App.jsx'
import { persistor, store } from './store/store.js'
import { router } from './navigation/router.jsx'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </RouterProvider>
  </Provider>
  // </React.StrictMode>
)
