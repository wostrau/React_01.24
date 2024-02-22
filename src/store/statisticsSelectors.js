import { createSelector } from '@reduxjs/toolkit'

const selectStatisticsSlice = (store) => store.statistics

export const selectTotalQuestions = createSelector(
  selectStatisticsSlice,
  (statistics) => statistics.totalQuestions
)

export const selectCorrectAnswers = createSelector(
  selectStatisticsSlice,
  (statistics) => statistics.correctAnswers
)

export const selectByCategory = createSelector(
  selectStatisticsSlice,
  (statistics) => statistics.questionsByCategory
)

export const selectByDifficulty = createSelector(
  selectStatisticsSlice,
  (statistics) => statistics.questionsByDifficulty
)

export const selectByType = createSelector(
  selectStatisticsSlice,
  (statistics) => statistics.questionsByType
)
