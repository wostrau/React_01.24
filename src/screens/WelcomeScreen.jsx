import React, { useState } from 'react'

import styles from './WelcomeScreen.module.css'
import { SETTINGS } from '../mock_data/settings'
import { FormFieldset } from '../components/FormFieldset'

export const WelcomeScreen = ({ onStartQuiz }) => {
  const [quizSettings, setQuizSettings] = useState({
    quantity: 5,
    category: 'any',
    difficulty: 'any',
    type: 'any',
    time: 300000
  })

  const handleQuizSettingsChange = (field, value) => {
    setQuizSettings((prevSettings) => ({ ...prevSettings, [field]: value }))
  }

  const handleStartQuiz = () => {
    onStartQuiz(quizSettings)
  }

  const handleSeeStatistics = () => {
    console.log('See my statistics clicked')
  }

  return (
    <>
      {SETTINGS.map((setting) => (
        <FormFieldset
          key={setting.id}
          value={quizSettings}
          onChange={handleQuizSettingsChange}
          {...setting}
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
    </>
  )
}
