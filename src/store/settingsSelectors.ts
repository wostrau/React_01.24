import { createSelector } from '@reduxjs/toolkit'
import { formatToOneDigitMinutes } from '../utils/utils'
import { SettingsState } from './settingsReducer'
import { RootState } from './store'

const selectSettingsSlice = (store: RootState) => store.settings

export const selectSettings = createSelector(
  selectSettingsSlice,
  (settings: SettingsState) => settings.selectedSettings
)

export const selectCategories = createSelector(
  selectSettingsSlice,
  (settings: SettingsState) => settings.categories
)

export const selectFormattedTime = createSelector(selectSettingsSlice, (settings: SettingsState) =>
  formatToOneDigitMinutes(settings.selectedSettings.time)
)
