import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { App } from '../App'
import { Welcome } from '../routes/Welcome'
import { Loader } from '../components/Loader'
import { Quiz, Result, Statistics } from './lazyComponents'

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
            <React.Suspense fallback={<Loader />}>
              <Welcome />
            </React.Suspense>
          </AnimatePresence>
        )
      },
      {
        path: ROUTES.quiz,
        element: (
          <AnimatePresence mode="wait">
            <React.Suspense fallback={<Loader />}>
              <Quiz />
            </React.Suspense>
          </AnimatePresence>
        )
      },
      {
        path: ROUTES.result,
        element: (
          <AnimatePresence mode="wait">
            <React.Suspense fallback={<Loader />}>
              <Result />
            </React.Suspense>
          </AnimatePresence>
        )
      },
      {
        path: ROUTES.statistics,
        element: (
          <AnimatePresence mode="wait">
            <React.Suspense fallback={<Loader />}>
              <Statistics />
            </React.Suspense>
          </AnimatePresence>
        )
      }
    ]
  }
])
