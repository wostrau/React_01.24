import { createSelector } from '@reduxjs/toolkit'
import { RootState } from './store'

const selectQuizSlice = (store: RootState) => store.quiz

export const selectAnswers = createSelector(selectQuizSlice, (quiz) => quiz.answers)

export const selectQuestions = createSelector(selectQuizSlice, (quiz) => quiz.questions)

export const selectElapsedTime = createSelector(selectQuizSlice, (quiz) => quiz.elapsedTime)
