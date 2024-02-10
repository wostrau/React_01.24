import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import { App } from '../App'
import { Welcome } from '../routes/Welcome'
import { Quiz } from '../routes/Quiz'
import { Result } from '../routes/Result'
import { Statistics } from '../routes/Statistics'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Oops! Error route</div>,
    children: [
      {
        path: '/',
        element: <Welcome />
      },
      {
        path: 'quiz',
        element: <Quiz />
      },
      {
        path: 'result',
        element: <Result />
      },
      {
        path: 'statistics',
        element: <Statistics />
      }
    ]
  }
  // {
  //   path: '*',
  //   element: <App />
  // }
])

export const BasicRouter = () => {
  return <RouterProvider router={router} />
}
