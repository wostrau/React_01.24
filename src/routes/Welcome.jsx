import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTES } from '../navigation/router'
import { useFetchCategoriesQuery } from '../store/triviaApi'
import { updateSettings, setCategories } from '../store/settingsReducer'
import { selectCategories, selectSettings } from '../store/settingsSelectors'
import { Button, Box, Grid, Paper } from '@mui/material'
import { Settings } from '../components/Settings'

export const Welcome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, isLoading } = useFetchCategoriesQuery()

  const settings = useSelector(selectSettings)
  const categories = useSelector(selectCategories)

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data))
      dispatch(updateSettings({ setting: 'category', value: data[0].id }))
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
    <Grid item xs={8}>
      <Paper elevation={3}>
        <Settings
          settings={settings}
          isLoading={isLoading}
          categories={categories}
          onChange={handleQuizSettingsChange}
        />

        <Box
          padding={3}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '0'
          }}>
          <Button onClick={handleStartQuiz} variant="contained" color="primary">
            Start Quiz
          </Button>
          <Button onClick={handleSeeStatistics} variant="contained" color="primary">
            Statistics
          </Button>
        </Box>
      </Paper>
    </Grid>
  )
}
