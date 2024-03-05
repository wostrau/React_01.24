import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import { persistor, store } from './store/store'
import { router } from './navigation/router'

const element = document.getElementById('root')
const root = createRoot(element!)
const renderApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)

root.render(renderApp())
