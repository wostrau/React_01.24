import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import { App } from './App.jsx'
import { QuizSettingsProvider } from './context/QuizSettingsContext.jsx'
import { WelcomeScreen } from './routes/WelcomeScreen.jsx'
import { QuizScreen } from './routes/QuizScreen.jsx'
import { ResultScreen } from './routes/ResultScreen.jsx'
import { Statistics } from './routes/Statistics.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops! Error route</div>,
    children: [
      {
        path: '/',
        element: <WelcomeScreen />
      },
      {
        path: 'quiz',
        element: <QuizScreen />
      },
      {
        path: 'result',
        element: <ResultScreen />
      },
      {
        path: 'statistics',
        element: <Statistics />
      }
    ]
  },
  // {
  //   path: '*',
  //   element: <App />
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizSettingsProvider>
      <RouterProvider router={router} />
    </QuizSettingsProvider>
  </React.StrictMode>
)
