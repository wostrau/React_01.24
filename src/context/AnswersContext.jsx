import React, { createContext, useContext, useState } from 'react'

const AnswersContext = createContext()

export const useAnswersContext = () => useContext(AnswersContext)

const initialState = {
  selectedAnswers: [
    {
      questionId: '',
      answer: ''
    }
  ],
  elapsedTime: 0
}

export const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState(initialState)

  const updateAnswers = (answers, elapsedTime) => {
    setAnswers({ selectedAnswers: [...answers], elapsedTime })
  }

  const resetAnswers = () => {
    setAnswers(initialState)
  }

  return (
    <AnswersContext.Provider value={{ answers, updateAnswers, resetAnswers }}>
      {children}
    </AnswersContext.Provider>
  )
}
