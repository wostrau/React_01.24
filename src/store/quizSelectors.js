import { createSelector } from '@reduxjs/toolkit'

const selectQuizSlice = (store) => store.quiz

export const selectAnswers = createSelector(selectQuizSlice, (quiz) => quiz.answers)

export const selectQuestions = createSelector(selectQuizSlice, (quiz) => quiz.questions)

export const selectElapsedTime = createSelector(selectQuizSlice, (quiz) => quiz.elapsedTime)
