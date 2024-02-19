import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import { App } from '../App.jsx'
import { Welcome } from '../routes/Welcome.jsx'
import { Quiz } from '../routes/Quiz.jsx'
import { Result } from '../routes/Result.jsx'
import { Statistics } from '../routes/Statistics.jsx'

export const ROUTES = {
  root: '/',
  quiz: '/quiz',
  result: '/result',
  statistics: '/statistics'
}

const router = createBrowserRouter([
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
