import { Settings } from "../store/triviaApi"

export const formatTime = (milliseconds: number): string[] => {
  const formattedMinutes = String(Math.floor(milliseconds / 60000)).padStart(2, '0')
  const formattedSeconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0')

  return [formattedMinutes, formattedSeconds]
}

export const formatToOneDigitMinutes = (milliseconds: number): string => {
  return String(Math.floor(milliseconds / 60000)).charAt(0)
}

export const countCorrectAnswers = (questions: any[], answers: any[]): number => {
  let correctAnswersCount = 0

  questions.forEach((question) => {
    let correspondingAnswer = answers.find((answer) => answer.question === question.question)

    if (correspondingAnswer && correspondingAnswer.answer === question.correct_answer) {
      correctAnswersCount++
    }
  })

  return correctAnswersCount
}

export const generateApiUrl = (settings: Settings): string => {
  let apiUrl = ''

  for (const [key, value] of Object.entries(settings)) {
    if (value !== '' && key !== 'time') {
      apiUrl += `${key}=${encodeURIComponent(value)}&`
    }
  }

  apiUrl = apiUrl.slice(0, -1)

  return apiUrl
}

export const shuffleAnswers = (answers: any[]): any[] => {
  return answers.sort(() => Math.random() - 0.5)
}
