import { createSelector } from '@reduxjs/toolkit'
import { StatisticsState } from './statisticsReducer'
import { RootState } from './store'

const selectStatisticsSlice = (store: RootState) => store.statistics

export const selectTotalQuestions = createSelector(
  selectStatisticsSlice,
  (statistics: StatisticsState) => statistics.totalQuestions
)

export const selectCorrectAnswers = createSelector(
  selectStatisticsSlice,
  (statistics: StatisticsState) => statistics.correctAnswers
)

export const selectByCategory = createSelector(
  selectStatisticsSlice,
  (statistics: StatisticsState) => statistics.questionsByCategory
)

export const selectByDifficulty = createSelector(
  selectStatisticsSlice,
  (statistics: StatisticsState) => statistics.questionsByDifficulty
)

export const selectByType = createSelector(
  selectStatisticsSlice,
  (statistics: StatisticsState) => statistics.questionsByType
)
