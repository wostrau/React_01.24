import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decode } from 'html-entities'
import { CategoryType, SettingsType } from './triviaApi'

export type SettingsState = {
  selectedSettings: SettingsType
  categories: CategoryType[]
}

const defaultSettings: SettingsState = {
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
    updateSettings(state, action: PayloadAction<{ setting: string; value: string | number }>) {
      const { setting, value } = action.payload
      state.selectedSettings[setting] = value as string | number
    },
    resetSettings(state) {
      state.selectedSettings = defaultSettings.selectedSettings
    },
    setCategories(state, action: PayloadAction<CategoryType[]>) {
      state.categories = action.payload.map((category) => ({
        ...category,
        name: decode(category.name)
      }))
    }
  }
})

export const settingsReducer = settingsSlice.reducer

export const { updateSettings, resetSettings, setCategories } = settingsSlice.actions
