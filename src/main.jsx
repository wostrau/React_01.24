import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { AnswersProvider } from './context/AnswersContext.jsx'
import { BasicRouter } from './navigation/BasicRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <AnswersProvider>
        <BasicRouter />
      </AnswersProvider>
    </SettingsProvider>
  </React.StrictMode>
)
