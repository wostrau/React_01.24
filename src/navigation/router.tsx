import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { App } from '../App'
import { Welcome } from '../routes/Welcome'
import { Loader } from '../components/Loader'

const Quiz = lazy(() => import('../routes/Quiz'))
const Result = lazy(() => import('../routes/Result'))
const Statistics = lazy(() => import('../routes/Statistics'))

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
        element: (
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Welcome />
            </Suspense>
          </AnimatePresence>
        )
      },
      {
        path: ROUTES.quiz,
        element: (
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Quiz />
            </Suspense>
          </AnimatePresence>
        )
      },
      {
        path: ROUTES.result,
        element: (
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Result />
            </Suspense>
          </AnimatePresence>
        )
      },
      {
        path: ROUTES.statistics,
        element: (
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loader />}>
              <Statistics />
            </Suspense>
          </AnimatePresence>
        )
      }
    ]
  }
])


