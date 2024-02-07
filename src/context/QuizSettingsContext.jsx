import React, { createContext, useContext, useState } from 'react'

const QuizSettingsContext = createContext()

export const useQuizSettings = () => useContext(QuizSettingsContext)

const initialSettings = {
  quantity: 5,
  category: 'any',
  difficulty: 'any',
  type: 'any',
  time: 300000
}

export const QuizSettingsProvider = ({ children }) => {
  const [quizSettings, setQuizSettings] = useState(initialSettings)

  const updateQuizSettings = (newSettings) => {
    setQuizSettings({ ...quizSettings, ...newSettings })
  }

  const resetQuizSettings = () => {
    setQuizSettings(initialSettings)
  }

  return (
    <QuizSettingsContext.Provider value={{ quizSettings, updateQuizSettings, resetQuizSettings }}>
      {children}
    </QuizSettingsContext.Provider>
  )
}
