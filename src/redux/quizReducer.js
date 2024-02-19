import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { generateApiUrl } from '../utils/utils'

// const defaultQuiz = {
//   questions: [
//     {
//       type: 'multiple',
//       difficulty: 'easy',
//       category: 'Entertainment: Books',
//       question: 'Which is NOT a book in the Harry Potter Series?',
//       answers: [],
//       correct_answer: 'The House Elf',
//       incorrect_answers: [
//         'The Chamber of Secrets',
//         'The Prisoner of Azkaban',
//         'The Deathly Hallows'
//       ]
//     },
//     {
//       type: 'boolean',
//       difficulty: 'hard',
//       category: 'Entertainment: Music',
//       question:
//         'Pete Townshend&#039;s solo album, &quot;White City: A Novel&quot;, is set in the metropolitan area of Chicago.',
//       answers: [],
//       correct_answer: 'False',
//       incorrect_answers: ['True']
//     }
//   ],
//   answers: [],
//   elapsedTime: 0
// }

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
      state.answers.push(action.payload.answer)
    },
    updateTimer(state, action) {
      state.remainingTime = action.payload.remainingTime
    },
    resetQuiz(state) {
      state = defaultQuiz
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload
    })
  }
})

export const quizReducer = quizSlice.reducer

export const { updateAnswers, updateTimer, resetQuiz } = quizSlice.actions
