import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { AnswersProvider } from './context/AnswersContext.jsx'
import { StoreProvider } from './redux/StoreProvider.jsx'
import { BasicRouter } from './navigation/BasicRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AnswersProvider>
        <StoreProvider>
          <BasicRouter />
        </StoreProvider>
      </AnswersProvider>
  </React.StrictMode>
)
