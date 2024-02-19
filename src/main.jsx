import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { StoreProvider } from './store/StoreProvider.jsx'
import { BasicRouter } from './navigation/BasicRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <StoreProvider>
    <BasicRouter />
  </StoreProvider>
  //</React.StrictMode>
)
