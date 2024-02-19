export const formatTime = (milliseconds) => {
  const formattedMinutes = String(Math.floor(milliseconds / 60000)).padStart(2, '0')
  const formattedSeconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0')

  return [formattedMinutes, formattedSeconds]
}

export const countCorrectAnswers = (questions, selectedAnswers) => {
  let correctCount = 0

  selectedAnswers.forEach((selectedAnswer) => {
    const question = questions.find((q) => q.id === selectedAnswer.questionId)

    if (question && question.answers.length > 0 && question.answers[0] === selectedAnswer.answer) {
      correctCount++
    }
  })

  return correctCount
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