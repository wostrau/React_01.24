import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Quiz.module.css'
import { TimerWithProgressBar } from '../components/TimerWithProgressBar'
import { useSettingsContext } from '../context/SettingsContext'
import { useAnswersContext } from '../context/AnswersContext'
import { QUESTIONS } from '../mock_data/questions'

export const Quiz = () => {
  const { settings } = useSettingsContext()
  const { quantity, time } = settings
  const { updateAnswers } = useAnswersContext()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])

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
    navigate('/result')
  }

  return (
    <>
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
        onTimerFinish={handleEndQuiz}
        onTimerUpdate={handleTimerUpdate}
      />
      <button className={styles.endQuizButton} onClick={handleEndQuiz}>
        End Quiz
      </button>
    </>
  )
}
