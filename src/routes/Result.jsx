import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Result.module.css'
import { ROUTES } from '../navigation/router'
import { formatTime } from '../utils/utils'
import { resetSettings } from '../store/settingsReducer'
import { countCorrectAnswers } from '../utils/utils'
import { resetAnswers, resetQuiz } from '../store/quizReducer'
import { useDispatch, useSelector } from 'react-redux'
import { selectFormattedTime, selectSettings } from '../store/settingsSelectors'
import { selectAnswers, selectElapsedTime, selectQuestions } from '../store/quizSelectors'

export const Result = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectedSettings = useSelector(selectSettings)
  const { amount, category, type, difficulty } = selectedSettings
  const quizTime = useSelector(selectFormattedTime)
  const elapsedTime = useSelector(selectElapsedTime)
  const questions = useSelector(selectQuestions)
  const answers = useSelector(selectAnswers)

  const [formattedMinutes, formattedSeconds] = formatTime(elapsedTime)
  const numberOfCorrectAnswers = countCorrectAnswers(questions, answers)

  const handleRestartQuiz = () => {
    dispatch(resetAnswers())
    navigate(ROUTES.quiz)
  }

  const handleChooseAnotherQuiz = () => {
    dispatch(resetSettings())
    dispatch(resetQuiz())
    navigate(ROUTES.root)
  }

  return (
    <>
      <h2 className={styles.resultText}>
        Thank you for completing this quiz. Here are your results:
      </h2>

      <p className={styles.resultStats}>
        You answered {numberOfCorrectAnswers} out of {amount} questions correctly.
      </p>

      <p className={styles.resultStats}>Quiz Configuration:</p>
      <ul className={styles.resultStats}>
        <li>Category: {category === '' ? 'any' : category}</li>
        <li>Difficulty: {difficulty === '' ? 'any' : difficulty}</li>
        <li>Type: {type === '' ? 'any' : type}</li>
        <li>Time: {quizTime} minutes</li>
      </ul>

      <div className={styles.timerDisplay}>
        {`Time spent: ${formattedMinutes}:${formattedSeconds}`}
      </div>

      <div className={styles.resultButtons}>
        <button className={styles.resultButton} onClick={handleRestartQuiz}>
          Restart
        </button>
        <button className={styles.resultButton} onClick={handleChooseAnotherQuiz}>
          Choose Another Quiz
        </button>
      </div>
    </>
  )
}
