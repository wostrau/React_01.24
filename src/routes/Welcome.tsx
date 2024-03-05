import React from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { selectCategories, selectSettings } from '../store/settingsSelectors'
import { updateSettings, setCategories } from '../store/settingsReducer'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Button, Box, Grid, Paper } from '@mui/material'
import { Settings } from '../components/Settings'
import { triviaApi } from '../store/triviaApi'
import { ROUTES } from '../navigation/router'

const AnimatedGrid = motion(Grid)

export const Welcome: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data, isLoading } = triviaApi.useFetchCategoriesQuery()

  const categories = useAppSelector(selectCategories)
  const settings = useAppSelector(selectSettings)

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data))
      dispatch(updateSettings({ setting: 'category', value: data[0].id }))
    }
  }, [data, dispatch])

  const handleQuizSettingsChange = (setting: string, value: string | number) => {
    dispatch(updateSettings({ setting, value }))
  }

  const handleStartQuiz = () => {
    navigate(ROUTES.quiz)
  }

  const handleSeeStatistics = () => {
    navigate(ROUTES.statistics)
  }

  return (
    <AnimatedGrid
      item
      xs={8}
      md={8}
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
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
    </AnimatedGrid>
  )
}
