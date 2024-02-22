import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import styles from './Statistics.module.css'
import { ROUTES } from '../navigation/router'
import {
  selectByCategory,
  selectByDifficulty,
  selectByType,
  selectCorrectAnswers,
  selectTotalQuestions
} from '../store/statisticsSelectors'

export const Statistics = () => {
  const navigate = useNavigate()

  const totalQuestions = useSelector(selectTotalQuestions)
  const correctAnswers = useSelector(selectCorrectAnswers)
  const questionsByCategory = useSelector(selectByCategory)
  const questionsByDifficulty = useSelector(selectByDifficulty)
  const questionsByType = useSelector(selectByType)

  const handleBackToQuiz = () => {
    navigate(ROUTES.root)
  }

  return (
    <>
      <h2 className={styles.resultText}>Your statistics:</h2>

      <p className={styles.resultStats}>Total amount of questions: {totalQuestions}</p>
      <p className={styles.resultStats}>Amount of given correct answers: {correctAnswers}</p>

      <div className={styles.resultStats}>
        By category:{' '}
        {Object.entries(questionsByCategory).length ? (
          <ul>
            {Object.entries(questionsByCategory).map(([category, count]) => (
              <li key={category}>
                {category}: {count}
              </li>
            ))}
          </ul>
        ) : (
          0
        )}
      </div>

      <div className={styles.resultStats}>
        By difficulty:{' '}
        {Object.entries(questionsByDifficulty).length ? (
          <ul>
            {Object.entries(questionsByDifficulty).map(([difficulty, count]) => (
              <li key={difficulty}>
                {difficulty}: {count}
              </li>
            ))}
          </ul>
        ) : (
          0
        )}
      </div>

      <div className={styles.resultStats}>
        By type:{' '}
        {Object.entries(questionsByType).length ? (
          <ul>
            {Object.entries(questionsByType).map(([type, count]) => (
              <li key={type}>
                {type}: {count}
              </li>
            ))}
          </ul>
        ) : (
          0
        )}
      </div>

      <div className={styles.resultButtons}>
        <button className={styles.resultButton} onClick={handleBackToQuiz}>
          Back To Quiz
        </button>
      </div>
    </>
  )
}
