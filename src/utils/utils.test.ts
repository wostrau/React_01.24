import {
  formatTime,
  generateApiUrl,
  arraysAreEqual,
  shuffleAnswers,
  countCorrectAnswers,
  formatToOneDigitMinutes
} from './utils'

import { AnswerType } from '../store/quizReducer'
import { QuestionType, SettingsType } from '../store/triviaApi'

type StartStateType = {
  settings: SettingsType
  questions: QuestionType[]
  answers: AnswerType[]
}

let startState: StartStateType

beforeEach(() => {
  startState = {
    settings: {
      amount: 15,
      category: 10,
      difficulty: 'hard',
      type: '',
      time: 90000
    },
    questions: [
      {
        type: 'any',
        difficulty: 'any',
        category: 'any',
        question: 'q1',
        correct_answer: 'correctAnswerQ1',
        incorrect_answers: ['incorrectAnswerQ1_1', 'incorrectAnswerQ1_2', 'incorrectAnswerQ1_3']
      },
      {
        type: 'any',
        difficulty: 'any',
        category: 'any',
        question: 'q2',
        correct_answer: 'correctAnswerQ2',
        incorrect_answers: ['incorrectAnswerQ2']
      },
      {
        type: 'any',
        difficulty: 'any',
        category: 'any',
        question: 'q3',
        correct_answer: 'correctAnswerQ3',
        incorrect_answers: ['incorrectAnswerQ3']
      }
    ],
    answers: [
      {
        question: 'q1',
        answer: 'correctAnswerQ1'
      },
      {
        question: 'q2',
        answer: 'correctAnswerQ2'
      },
      {
        question: 'q3',
        answer: 'incorrectAnswerQ3'
      }
    ]
  }
})

describe('Utils tests', () => {
  test('Utility function formatTime should return correct result', () => {
    const newValue = startState.settings.time

    const [formattedMinutes, formattedSeconds] = formatTime(newValue)

    expect(formattedMinutes).not.toBe(1)
    expect(formattedMinutes).toBe('01')
    expect(formattedSeconds).not.toBe(30)
    expect(formattedSeconds).toBe('30')
  })

  test('Utility function formatToOneDigitMinutes should return correct result', () => {
    const newValue = startState.settings.time

    const formattedMinutes = formatToOneDigitMinutes(newValue)

    expect(formattedMinutes).not.toBe(1)
    expect(formattedMinutes).not.toBe('01')
    expect(formattedMinutes).toBe('1')
  })

  test('Utility function countCorrectAnswers should return correct result', () => {
    const newQuestions = startState.questions
    const newAnswers = startState.answers

    const correctAnswersCount = countCorrectAnswers(newQuestions, newAnswers)

    expect(correctAnswersCount).not.toBe('2')
    expect(correctAnswersCount).not.toBe(3)
    expect(correctAnswersCount).toBe(2)
  })

  test('Utility function generateApiUrl should return correct result', () => {
    const newValue = startState.settings

    const generatedApiUrl = generateApiUrl(newValue)

    expect(typeof generatedApiUrl).toBe('string')
    expect(generatedApiUrl).not.toBe(3)
    expect(generatedApiUrl).toBe('amount=15&category=10&difficulty=hard')
  })

  test('Utility function shuffleAnswers should return correct result', () => {
    const newArray = [
      ...startState.questions[0].incorrect_answers,
      startState.questions[0].correct_answer
    ]

    const shuffledAnswers = shuffleAnswers(newArray)

    expect(shuffledAnswers.length).toBe(4)
    expect(shuffledAnswers).not.toEqual(newArray)
  })

  test('Utility function arraysAreEqual should compare correctly', () => {
    const newArray = [
      ...startState.questions[0].incorrect_answers,
      startState.questions[0].correct_answer
    ]
    const shuffledAnswers = shuffleAnswers(newArray)

    const comparisonResult = arraysAreEqual(shuffledAnswers, newArray)

    expect(comparisonResult).toBeFalsy()
  })
})
