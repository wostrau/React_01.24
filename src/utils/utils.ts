import { AnswerType } from '../store/quizReducer'
import { QuestionType, SettingsType } from '../store/triviaApi'

export const formatTime = (milliseconds: number): string[] => {
  const formattedMinutes = String(Math.floor(milliseconds / 60000)).padStart(2, '0')
  const formattedSeconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0')

  return [formattedMinutes, formattedSeconds]
}

export const formatToOneDigitMinutes = (milliseconds: number): string => {
  return String(Math.floor(milliseconds / 60000)).charAt(0)
}

export const countCorrectAnswers = (questions: QuestionType[], answers: AnswerType[]): number => {
  let correctAnswersCount = 0

  questions.forEach((question) => {
    const correspondingAnswer = answers.find((answer) => answer.question === question.question)

    if (correspondingAnswer && correspondingAnswer.answer === question.correct_answer) {
      correctAnswersCount++
    }
  })

  return correctAnswersCount
}

export const generateApiUrl = (settings: SettingsType): string => {
  let apiUrl = ''

  for (const [key, value] of Object.entries(settings)) {
    if (value !== '' && key !== 'time') {
      apiUrl += `${key}=${encodeURIComponent(value)}&`
    }
  }

  apiUrl = apiUrl.slice(0, -1)

  return apiUrl
}

export const shuffleAnswers = (answers: string[]): string[] => {
  let shuffled = [...answers]

  while (arraysAreEqual(shuffled, answers)) {
    shuffled = shuffled.sort(() => Math.random() - 0.5)
  }

  return shuffled
}

export const arraysAreEqual = (firstArray: string[], secondArray: string[]): boolean => {
  if (firstArray.length !== secondArray.length) {
    throw new Error('arrays are of different length')
  }

  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i] !== secondArray[i]) {
      return false
    }
  }

  return true
}
