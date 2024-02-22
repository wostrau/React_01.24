import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import * as rp from 'redux-persist'

import { triviaApi } from './triviaApi'
import { quizReducer } from './quizReducer'
import { settingsReducer } from './settingsReducer'
import { statisticsReducer } from './statisticsReducer'

const reducers = combineReducers({
  quiz: quizReducer,
  settings: settingsReducer,
  statistics: statisticsReducer,
  [triviaApi.reducerPath]: triviaApi.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['statistics']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER]
      }
    }).concat(triviaApi.middleware)
})

export const persistor = persistStore(store)
