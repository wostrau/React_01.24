import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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

export const fetchCategories = createAsyncThunk('settings/fetchCategories', async () => {
  const response = await fetch('https://opentdb.com/api_category.php')
  const data = await response.json()
  return data.trivia_categories
})

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultSettings,
  reducers: {
    updateSettings(state, action) {
      state.selectedSettings[action.payload.setting] = action.payload.value
    },
    resetSettings(state) {
      state.selectedSettings = defaultSettings.selectedSettings
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      if (!state.categories.length) {
        state.categories = action.payload
      }
    })
  }
})

export const settingsReducer = settingsSlice.reducer

export const { updateSettings, resetSettings } = settingsSlice.actions
