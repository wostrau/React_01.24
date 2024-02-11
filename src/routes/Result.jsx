import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Result.module.css'
import { formatTime } from '../utils/utils'
import { useSettingsContext } from '../context/SettingsContext'
import { useAnswersContext } from '../context/AnswersContext'
import { QUESTIONS } from '../mock_data/questions'
import { countCorrectAnswers } from '../utils/utils'
import { ROUTES } from '../navigation/BasicRouter'

export const Result = () => {
  const { settings } = useSettingsContext()
  const { quantity, category, type, difficulty, time } = settings
  const { answers } = useAnswersContext()
  const { selectedAnswers, elapsedTime } = answers
  const navigate = useNavigate()

  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  useEffect(() => {
    const numberOfCorrectAnswers = countCorrectAnswers(QUESTIONS, selectedAnswers)

    setCorrectAnswersCount(numberOfCorrectAnswers)
  }, [])

  const [formattedMinutes, formattedSeconds] = formatTime(elapsedTime)
  const [quizTime] = formatTime(time)

  return (
    <>
      <h2 className={styles.resultText}>
        Thank you for completing this quiz. Here are your results:
      </h2>
      <p className={styles.resultStats}>
        You answered {correctAnswersCount} out of {quantity} questions correctly.
      </p>
      <p className={styles.resultStats}>Quiz Configuration:</p>
      <ul className={styles.resultStats}>
        <li>Type: {type}</li>
        <li>Category: {category}</li>
        <li>Time: {quizTime} minutes</li>
        <li>Difficulty: {difficulty}</li>
      </ul>
      <div
        className={
          styles.timerDisplay
        }>{`Time spent: ${formattedMinutes}:${formattedSeconds}`}</div>
      <div className={styles.resultButtons}>
        <button className={styles.resultButton} onClick={() => navigate(-1)}>
          Restart
        </button>
        <button className={styles.resultButton} onClick={() => navigate(ROUTES.welcomeRoot)}>
          Choose Another Quiz
        </button>
      </div>
    </>
  )
}
