import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { App } from '../App.jsx'
import { Welcome } from '../routes/Welcome.jsx'
import { Loader } from '../components/Loader.jsx'

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
    children: [
      {
        path: ROUTES.root,
        element: <Welcome />
      },
      {
        path: ROUTES.quiz,
        element: (
          <Suspense fallback={<Loader />}>
            <Quiz />
          </Suspense>
        )
      },
      {
        path: ROUTES.result,
        element: (
          <Suspense fallback={<Loader />}>
            <Result />
          </Suspense>
        )
      },
      {
        path: ROUTES.statistics,
        element: (
          <Suspense fallback={<Loader />}>
            <Statistics />
          </Suspense>
        )
      }
    ]
  }
])
