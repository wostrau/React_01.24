import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { countCorrectAnswers } from '../utils/utils'
import { AnswerType } from './quizReducer'
import { QuestionType } from './triviaApi'

type QuestionsByCategory = { [key: string]: number } | object

export type StatisticsState = {
  totalQuestions: number
  correctAnswers: number
  questionsByCategory: QuestionsByCategory
  questionsByDifficulty: QuestionsByCategory
  questionsByType: QuestionsByCategory
}

const defaultStatistics: StatisticsState = {
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
    updateStatistics(
      state,
      action: PayloadAction<{ questions: QuestionType[]; answers: AnswerType[] }>
    ) {
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
