import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { App } from '../App.jsx'
import { Welcome } from '../routes/Welcome.jsx'

const Quiz = lazy(() => import('../routes/Quiz.jsx'))
const Result = lazy(() => import('../routes/Result.jsx'))
const Statistics = lazy(() => import('../routes/Statistics.jsx'))

export const ROUTES = {
  root: '/',
  quiz: '/quiz',
  result: '/result',
  statistics: '/statistics'
}

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <App />,
    //errorElement: <div>Oops! Error route</div>,
    children: [
      {
        path: ROUTES.root,
        element: <Welcome />
      },
      {
        path: ROUTES.quiz,
        element: (
          <Suspense fallback={<div>Loading quiz...</div>}>
            <Quiz />
          </Suspense>
        )
      },
      {
        path: ROUTES.result,
        element: (
          <Suspense fallback={<div>Loading result...</div>}>
            <Result />
          </Suspense>
        )
      },
      {
        path: ROUTES.statistics,
        element: (
          <Suspense fallback={<div>Loading statistics...</div>}>
            <Statistics />
          </Suspense>
        )
      }
    ]
  }
])
