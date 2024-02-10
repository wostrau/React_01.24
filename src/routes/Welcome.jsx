import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Welcome.module.css'
import { SETTINGS } from '../mock_data/settings'
import { FormFieldset } from '../components/FormFieldset'
import { useSettingsContext } from '../context/SettingsContext'

export const Welcome = () => {
  const { settings, updateSettings, resetSettings } = useSettingsContext()
  const [quizSettings, setQuizSettings] = useState(settings)
  const navigate = useNavigate()

  useEffect(() => {
    resetSettings()
  }, [])

  const handleQuizSettingsChange = (field, value) => {
    setQuizSettings((prevSettings) => ({ ...prevSettings, [field]: value }))
  }

  const handleStartQuiz = () => {
    updateSettings(quizSettings)
    navigate('/quiz')
  }

  const handleSeeStatistics = () => {
    navigate('/statistics')
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
