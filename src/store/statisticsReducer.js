import { createSlice } from '@reduxjs/toolkit'
import { countCorrectAnswers } from '../utils/utils'

const defaultStatistics = {
  totalQuestions: 0,
  correctAnswers: 0,
  questionsByCategory: {},
  questionsByDifficulty: {},
  questionsByType: {}
}

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: defaultStatistics,
  reducers: {
    updateStatistics(state, action) {
      state.totalQuestions += action.payload.questions.length
      state.correctAnswers += countCorrectAnswers(action.payload.questions, action.payload.answers)
      action.payload.questions.forEach((question) => {
        if (!state.questionsByType[question.type]) {
          state.questionsByType[question.type] = 1
        } else state.questionsByType[question.type]++

        if (!state.questionsByDifficulty[question.difficulty]) {
          state.questionsByDifficulty[question.difficulty] = 1
        } else state.questionsByDifficulty[question.difficulty]++

        if (!state.questionsByCategory[question.category]) {
          state.questionsByCategory[question.category] = 1
        } else state.questionsByCategory[question.category]++
      })
    },
    resetStatistics() {
      return defaultStatistics
    }
  }
})

export const statisticsReducer = statisticsSlice.reducer

export const { updateStatistics, resetStatistics } = statisticsSlice.actions
