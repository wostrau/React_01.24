import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Welcome.module.css'
import { SETTINGS } from '../utils/settings'
import { ROUTES } from '../navigation/router'
import { FormFieldset } from '../components/FormFieldset'
import { useFetchCategoriesQuery } from '../store/triviaApi'
import { updateSettings, setCategories } from '../store/settingsReducer'
import { selectCategories, selectSettings } from '../store/settingsSelectors'

export const Welcome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const settings = useSelector(selectSettings)
  const categories = useSelector(selectCategories)
  const { data, isLoading } = useFetchCategoriesQuery()

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data))
    }
  }, [data, dispatch])

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
          value={settings}
          isLoading={isLoading}
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
