import React from 'react'

import styles from './ResultScreen.module.css'
import { formatTime } from '../utils/utils'

export const ResultScreen = ({
  correctAnswersCount,
  totalQuestions,
  timeElapsed,
  onRestart,
  onChooseAnother,
  type,
  category,
  time,
  difficulty
}) => {
  const [formattedMinutes, formattedSeconds] = formatTime(timeElapsed)
  const [quizTime] = formatTime(time)

  return (
    <>
      <h2 className={styles.resultText}>
        Thank you for completing this quiz. Here are your results:
      </h2>
      <p className={styles.resultStats}>
        You answered {correctAnswersCount} out of {totalQuestions} questions correctly.
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
        <button className={styles.resultButton} onClick={onRestart}>
          Restart
        </button>
        <button className={styles.resultButton} onClick={onChooseAnother}>
          Choose Another Quiz
        </button>
      </div>
    </>
  )
}
