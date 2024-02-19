export const formatTime = (milliseconds) => {
  const formattedMinutes = String(Math.floor(milliseconds / 60000)).padStart(2, '0')
  const formattedSeconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0')

  return [formattedMinutes, formattedSeconds]
}

export const formatToOneDigitMinutes = (milliseconds) => {
  return String(Math.floor(milliseconds / 60000)).charAt(0)
}

export const countCorrectAnswers = (questions, answers) => {
  let correctAnswersCount = 0

  questions.forEach((question) => {
    let correspondingAnswer = answers.find((answer) => answer.question === question.question)

    if (correspondingAnswer && correspondingAnswer.answer === question.correct_answer) {
      correctAnswersCount++
    }
  })

  return correctAnswersCount
}

export const generateApiUrl = (settings) => {
  let apiUrl = 'https://opentdb.com/api.php?'

  for (const [key, value] of Object.entries(settings)) {
    if (value !== '' && key !== 'time') {
      apiUrl += `${key}=${encodeURIComponent(value)}&`
    }
  }

  apiUrl = apiUrl.slice(0, -1)

  return apiUrl
}

export const shuffleAnswers = (answers) => {
  return answers.sort(() => Math.random() - 0.5)
}
