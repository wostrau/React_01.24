import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decode } from 'html-entities'
import { QuestionType } from './triviaApi'

export type AnswerType = {
  question: string
  answer: string
}

export type QuizState = {
  questions: QuestionType[]
  answers: AnswerType[]
  elapsedTime: number
}

const defaultQuiz: QuizState = {
  questions: [],
  answers: [],
  elapsedTime: 0
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState: defaultQuiz,
  reducers: {
    updateAnswers(state, action: PayloadAction<AnswerType>) {
      state.answers.push(action.payload)
    },
    updateTimer(state, action: PayloadAction<{ elapsedTime: number }>) {
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
    setQuestions(state, action: PayloadAction<QuestionType[]>) {
      state.questions = action.payload.map((item) => ({
        ...item,
        question: decode(item.question),
        category: decode(item.category),
        correct_answer: decode(item.correct_answer),
        incorrect_answers: item.incorrect_answers.map((answer: string) => decode(answer))
      }))
    }
  }
})

export const quizReducer = quizSlice.reducer

export const { updateAnswers, updateTimer, resetQuiz, resetAnswers, setQuestions } =
  quizSlice.actions
