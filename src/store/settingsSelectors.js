import { createSelector } from '@reduxjs/toolkit'
import { formatToOneDigitMinutes } from '../utils/utils'

const selectSettingsSlice = (store) => store.settings

export const selectSettings = createSelector(
  selectSettingsSlice,
  (settings) => settings.selectedSettings
)

export const selectCategories = createSelector(
  selectSettingsSlice,
  (settings) => settings.categories
)

export const selectFormattedTime = createSelector(selectSettingsSlice, (settings) =>
  formatToOneDigitMinutes(settings.selectedSettings.time)
)
