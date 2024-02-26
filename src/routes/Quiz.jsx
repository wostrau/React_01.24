import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Quiz.module.css'
import { Modal } from '../components/Modal'
import { ROUTES } from '../navigation/router'
import { shuffleAnswers } from '../utils/utils'
import { useFetchQuestionsQuery } from '../store/triviaApi'
import { selectSettings } from '../store/settingsSelectors'
import { TimerWithProgressBar } from '../components/TimerWithProgressBar'
import { setQuestions, updateAnswers, updateTimer } from '../store/quizReducer'
import { selectAnswers, selectQuestions } from '../store/quizSelectors'
import { updateStatistics } from '../store/statisticsReducer'

const Quiz = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)
  const [isPause, setIsPause] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const settings = useSelector(selectSettings)
  const { data, isLoading } = useFetchQuestionsQuery(settings)
  const { amount, time } = settings
  const questions = useSelector(selectQuestions)
  const answers = useSelector(selectAnswers)

  useEffect(() => {
    if (data) {
      dispatch(setQuestions(data))
      setIsPause(false)
    }
  }, [data, dispatch])

  const handleAnswerClick = (question, answer) => {
    dispatch(updateAnswers({ question, answer }))

    if (index < amount - 1) {
      setIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleTimerUpdate = (remainingTime) => {
    const elapsedTime = time - remainingTime
    dispatch(updateTimer({ elapsedTime }))
  }

  const handleEndQuiz = () => {
    dispatch(updateStatistics({ questions, answers }))
    navigate(ROUTES.result)
  }

  const handleResumeQuiz = () => {
    setIsOpen(false)
    setIsPause(false)
  }

  const handlePauseQuiz = () => {
    setIsOpen(true)
    setIsPause(true)
  }

  return (
    <>
      {isOpen && (
        <Modal
          onCancel={handleResumeQuiz}
          onConfirm={handleEndQuiz}
          text="Do you want to end up the quiz and see your result?"
        />
      )}

      {isLoading && <p className={styles.question}>Loading...</p>}

      {Array.isArray(questions) && questions[index] && (
        <>
          <p className={styles.question}>{questions[index].question}</p>

          <p className={styles.questionQty}>{`question ${index + 1} / ${amount}`}</p>

          <div className={styles.answerButtons}>
            {Array.isArray(questions) &&
              questions[index] &&
              shuffleAnswers([
                ...questions[index].incorrect_answers,
                questions[index].correct_answer
              ]).map((answer, index) => (
                <button
                  key={index}
                  className={styles.answerButton}
                  onClick={() => handleAnswerClick(questions[index].question, answer)}
                  disabled={answers.length > index + 1}>
                  {answer}
                </button>
              ))}
          </div>
        </>
      )}

      <TimerWithProgressBar
        totalTime={time}
        pause={isPause}
        onTimerFinish={handleEndQuiz}
        onTimerUpdate={handleTimerUpdate}
      />

      <button className={styles.endQuizButton} onClick={handlePauseQuiz}>
        End Quiz
      </button>
    </>
  )
}

export default Quiz
