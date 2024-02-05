import React, { useState } from 'react'

import styles from './QuizScreen.module.css'
import { TimerWithProgressBar } from '../components/TimerWithProgressBar'

export const QuizScreen = ({ onEndQuiz, questions, quantity, time }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])

  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, { questionId, answer }])

    if (currentQuestionIndex < quantity - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleEndQuiz = () => {
    onEndQuiz(selectedAnswers)
  }

  return (
    <>
      <p className={styles.question}>{questions[currentQuestionIndex].text}</p>
      <p className={styles.questionQty}>{`question ${currentQuestionIndex + 1} / ${quantity}`}</p>
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
      <TimerWithProgressBar totalTime={time} onTimerFinish={handleEndQuiz} />
      <button className={styles.endQuizButton} onClick={handleEndQuiz}>
        End Quiz
      </button>
    </>
  )
}
