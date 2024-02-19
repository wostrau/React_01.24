import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

export const useSelectedSettings = () => {
  return useSelector((store) => store.settings.selectedSettings)
}

export const useCategories = () => {
  return useSelector((store) => store.settings.categories)
}

export const useSelectedAnswers = () => {
  return useSelector((store) => store.quiz.answers)
}

export const useSelectedQuestions = () => {
  return useSelector(
    createSelector(
      (store) => store.quiz.questions,
      (questions) => {
        return questions.map((q) => {
          const answers = [q.correct_answer, ...q.incorrect_answers]
          const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5)
          return { question: q.question, type: q.type, answers: [...shuffledAnswers] }
        })
      }
    )
  )
}
