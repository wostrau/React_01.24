import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Quiz.module.css'
import { TimerWithProgressBar } from '../components/TimerWithProgressBar'
import { useSettingsContext } from '../context/SettingsContext'
import { useAnswersContext } from '../context/AnswersContext'
import { QUESTIONS } from '../mock_data/questions'
import { ROUTES } from '../navigation/BasicRouter'
import { Modal } from '../components/Modal'

export const Quiz = () => {
  const { settings } = useSettingsContext()
  const { quantity, time } = settings
  const { updateAnswers } = useAnswersContext()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isPause, setIsPause] = useState(false)

  useEffect(() => {
    const shuffledQuestions = [...QUESTIONS].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions)
  }, [])

  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, { questionId, answer }])

    if (currentQuestionIndex < quantity - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleTimerUpdate = (elapsedTime) => {
    setElapsedTime(time - elapsedTime)
  }

  const handleEndQuiz = () => {
    updateAnswers(selectedAnswers, elapsedTime)
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
          <p className={styles.question}>{questions[currentQuestionIndex].text}</p>
          <p
            className={
              styles.questionQty
            }>{`question ${currentQuestionIndex + 1} / ${quantity}`}</p>
          <div className={styles.answerButtons}>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button
                key={index}
                className={styles.answerButton}
                onClick={() => handleAnswerClick(questions[currentQuestionIndex], answer)}
                disabled={selectedAnswers.length >= currentQuestionIndex + 1}>
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
