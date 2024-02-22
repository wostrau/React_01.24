import { configureStore } from '@reduxjs/toolkit'

import { triviaApi } from './triviaApi'
import { quizReducer } from './quizReducer'
import { settingsReducer } from './settingsReducer'
import { statisticsReducer } from './statisticsReducer'

const combinedReducers = {
  quiz: quizReducer,
  settings: settingsReducer,
  statistics: statisticsReducer,
  [triviaApi.reducerPath]: triviaApi.reducer
}

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (gDM) => gDM().concat(triviaApi.middleware)
})
