import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './Welcome.module.css'
import { ROUTES } from '../navigation/BasicRouter'
import { SETTINGS } from '../mock_data/settings'
import { FormFieldset } from '../components/FormFieldset'
import { useCategories, useSelectedSettings } from '../redux/selectors'
import { updateSettings, fetchCategories } from '../redux/settingsReducer'
import { generateApiUrl } from '../utils/utils'

export const Welcome = () => {
  const selectedSettings = useSelectedSettings()
  const categories = useCategories()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories())
    }
  }, [])

  console.log(generateApiUrl(selectedSettings))

  const handleQuizSettingsChange = (setting, value) => {
    dispatch(updateSettings({ setting, value }))
  }

  const handleStartQuiz = () => {
    navigate(ROUTES.quiz)
  }

  const handleSeeStatistics = () => {
    navigate(ROUTES.statistics)
  }

  return (
    <>
      {SETTINGS.map((setting) => (
        <FormFieldset
          key={setting.id}
          value={selectedSettings}
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
