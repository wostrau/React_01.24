import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './Quiz.module.css'
import { TimerWithProgressBar } from '../components/TimerWithProgressBar'
import { ROUTES } from '../navigation/BasicRouter'
import { Modal } from '../components/Modal'
import { useSelectedAnswers, useSelectedQuestions, useSelectedSettings } from '../redux/selectors'
import { fetchQuestions, resetQuiz, updateAnswers, updateTimer } from '../redux/quizReducer'

export const Quiz = () => {
  const selectedSettings = useSelectedSettings()
  const { amount, time } = useSelectedSettings()
  const questions = useSelectedQuestions()
  const answers = useSelectedAnswers()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isPause, setIsPause] = useState(false)

  useEffect(() => {
    if (!questions.length) {
      dispatch(fetchQuestions(selectedSettings))
    }
  }, [])

  const handleAnswerClick = (question, answer) => {
    dispatch(updateAnswers(question, answer))

    if (currentQuestionIndex === amount - 1) {
      setIsOpen(true)
      setIsPause(true)
    }

    if (currentQuestionIndex < amount - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleTimerUpdate = (elapsedTime) => {
    dispatch(updateTimer(elapsedTime))
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
      {questions[currentQuestionIndex] && (
        <>
          <p className={styles.question}>{questions[currentQuestionIndex].question}</p>
          <p className={styles.questionQty}>{`question ${currentQuestionIndex + 1} / ${amount}`}</p>
          <div className={styles.answerButtons}>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button
                key={index}
                className={styles.answerButton}
                onClick={() => handleAnswerClick(questions[currentQuestionIndex].question, answer)}
                disabled={answers.length >= currentQuestionIndex + 1}>
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
