import { createSlice } from '@reduxjs/toolkit'
import { decode } from 'html-entities'

const defaultQuiz = {
  questions: [],
  answers: [],
  elapsedTime: 0
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState: defaultQuiz,
  reducers: {
    updateAnswers(state, action) {
      state.answers.push(action.payload)
    },
    updateTimer(state, action) {
      state.elapsedTime = action.payload.elapsedTime
    },
    resetQuiz(state) {
      state.questions = defaultQuiz.questions
      state.answers = defaultQuiz.answers
      state.elapsedTime = defaultQuiz.elapsedTime
    },
    resetAnswers(state) {
      state.answers = defaultQuiz.answers
    },
    setQuestions(state, action) {
      state.questions = action.payload.results.map((item) => ({
        ...item,
        question: decode(item.question),
        category: decode(item.category),
        correct_answer: decode(item.question),
        incorrect_answers: item.incorrect_answers.map((answer) => decode(answer))
      }))
    }
  }
})

export const quizReducer = quizSlice.reducer

export const { updateAnswers, updateTimer, resetQuiz, resetAnswers, setQuestions } =
  quizSlice.actions
