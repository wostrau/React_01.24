import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './Welcome.module.css'
import { ROUTES } from '../navigation/BasicRouter'
import { SETTINGS } from '../utils/settings'
import { FormFieldset } from '../components/FormFieldset'
import { selectCategories, selectSettings } from '../store/settingsSelectors'
import { updateSettings, fetchCategories } from '../store/settingsReducer'

export const Welcome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedSettings = useSelector(selectSettings)
  const categories = useSelector(selectCategories)

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories())
    }
  }, [])

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
          categories={categories}
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
