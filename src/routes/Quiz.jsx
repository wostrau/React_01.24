import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Quiz.module.css'
import { TimerWithProgressBar } from '../components/TimerWithProgressBar'
import { ROUTES } from '../navigation/BasicRouter'
import { Modal } from '../components/Modal'
import { selectSettings } from '../store/settingsSelectors'
import { fetchQuestions, updateAnswers, updateTimer } from '../store/quizReducer'
import { selectAnswers, selectQuestions } from '../store/quizSelectors'
import { shuffleAnswers } from '../utils/utils'

export const Quiz = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)
  const [isPause, setIsPause] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const settings = useSelector(selectSettings)
  const { amount, time } = settings
  const questions = useSelector(selectQuestions)
  const answers = useSelector(selectAnswers)

  useEffect(() => {
    if (!questions.length) {
      dispatch(fetchQuestions(settings))
    }
  }, [])

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

      {Array.isArray(questions) && questions[index] && (
        <>
          <p className={styles.question}>{questions[index].question}</p>

          <p className={styles.questionQty}>{`question ${index + 1} / ${amount}`}</p>

          <div className={styles.answerButtons}>
            {Array.isArray(questions) &&
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
