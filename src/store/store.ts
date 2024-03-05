import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Middleware } from '@reduxjs/toolkit'

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
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
    return middleware.concat(triviaApi.middleware as Middleware<{}, {}>)
  }
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState> & { _persist: PersistPartial }

export type AppDispatch = typeof store.dispatch
