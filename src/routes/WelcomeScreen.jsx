import React, { useState } from 'react'

import styles from './WelcomeScreen.module.css'
import { SETTINGS } from '../context/settings'
import { FormFieldset } from '../components/FormFieldset'
import { useQuizSettings } from '../context/QuizSettingsContext'

export const WelcomeScreen = ({ onStartQuiz }) => {
  const { quizSettings, updateQuizSettings } = useQuizSettings()

  const [settings, setSettings] = useState(quizSettings)

  const handleQuizSettingsChange = (field, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [field]: value }))
  }

  const handleStartQuiz = () => {
    updateQuizSettings(settings)
    onStartQuiz()
  }

  const handleSeeStatistics = () => {
    console.log('See my statistics clicked')
  }

  return (
    <>
      {SETTINGS.map((setting) => (
        <FormFieldset
          key={setting.id}
          value={settings}
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
