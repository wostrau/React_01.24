import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { settingsReducer } from './settingsReducer'
import { quizReducer } from './quizReducer'

const combinedReducers = {
  quiz: quizReducer,
  settings: settingsReducer
}

const store = configureStore({
  reducer: combinedReducers
})

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
