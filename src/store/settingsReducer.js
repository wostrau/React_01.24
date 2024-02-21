import { createSlice } from '@reduxjs/toolkit'
import { decode } from 'html-entities'

const defaultSettings = {
  selectedSettings: {
    amount: 5,
    category: '',
    difficulty: '',
    type: '',
    time: 300000
  },
  categories: []
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultSettings,
  reducers: {
    updateSettings(state, action) {
      state.selectedSettings[action.payload.setting] = action.payload.value
    },
    resetSettings(state) {
      state.selectedSettings = defaultSettings.selectedSettings
    },
    setCategories(state, action) {
      state.categories = action.payload.trivia_categories.map((category) => ({
        ...category,
        name: decode(category.name)
      }))
    }
  }
})

export const settingsReducer = settingsSlice.reducer

export const { updateSettings, resetSettings, setCategories } = settingsSlice.actions
