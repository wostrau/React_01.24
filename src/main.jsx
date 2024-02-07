import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { App } from './App.jsx'
import { QuizSettingsProvider } from './context/QuizSettingsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizSettingsProvider>
      <App />
    </QuizSettingsProvider>
  </React.StrictMode>
)
