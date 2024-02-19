import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { generateApiUrl } from '../utils/utils'

const defaultQuiz = {
  questions: [],
  answers: [],
  elapsedTime: 0
}

export const fetchQuestions = createAsyncThunk('quiz/fetchQuestions', async (selectedSettings) => {
  const generatedApiUrl = generateApiUrl(selectedSettings)
  const response = await fetch(generatedApiUrl)
  const data = await response.json()
  return data.results
})

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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload
    })
  }
})

export const quizReducer = quizSlice.reducer

export const { updateAnswers, updateTimer, resetQuiz, resetAnswers } = quizSlice.actions
