import React, { useState } from 'react'

import styles from './WelcomeScreen.module.css'
import { FIELDSETS } from '../fieldsets'
import { FormFieldset } from '../components/FormFieldset'

export const WelcomeScreen = () => {
  const [quizSettings, setQuizSettings] = useState({
    numberOfQuestions: 5,
    category: 'any',
    difficulty: 'any',
    type: 'any',
    time: 'any'
  })

  const handleQuizSettingsChange = (field, value) => {
    setQuizSettings((prevSettings) => ({ ...prevSettings, [field]: value }))
  }

  const handleStartQuiz = () => {
    console.log('Start quiz clicked')
  }

  const handleSeeStatistics = () => {
    console.log('See my statistics clicked')
  }

  return (
    <div className={styles.welcomeContainer}>
      <h1>Welcome to the Quiz App!</h1>
      <div className={styles.inputPanel}>
        {FIELDSETS.map((fieldset) => (
          <FormFieldset
            key={fieldset.title}
            value={quizSettings}
            onChange={handleQuizSettingsChange}
            {...fieldset}
          />
        ))}
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleStartQuiz}>
            Start Quiz
          </button>
          <button className={styles.button} onClick={handleSeeStatistics}>
            See My Statistics
          </button>
        </div>
      </div>
    </div>
  )
}
