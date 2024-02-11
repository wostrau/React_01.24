import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import { App } from '../App'
import { Welcome } from '../routes/Welcome'
import { Quiz } from '../routes/Quiz'
import { Result } from '../routes/Result'
import { Statistics } from '../routes/Statistics'

export const ROUTES = {
  welcomeRoot: '/',
  quiz: '/quiz',
  result: '/result',
  statistics: '/statistics'
}

const router = createBrowserRouter([
  {
    path: ROUTES.welcomeRoot,
    element: <App />,
    errorElement: <div>Oops! Error route</div>,
    children: [
      {
        path: ROUTES.welcomeRoot,
        element: <Welcome />
      },
      {
        path: ROUTES.quiz,
        element: <Quiz />
      },
      {
        path: ROUTES.result,
        element: <Result />
      },
      {
        path: ROUTES.statistics,
        element: <Statistics />
      }
    ]
  }
])

export const BasicRouter = () => {
  return <RouterProvider router={router} />
}
