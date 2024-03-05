import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { formatTime } from '../utils/utils'
import { ROUTES } from '../navigation/router'
import { countCorrectAnswers } from '../utils/utils'
import { resetSettings } from '../store/settingsReducer'
import { resetAnswers, resetQuiz } from '../store/quizReducer'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectAnswers, selectElapsedTime, selectQuestions } from '../store/quizSelectors'
import { selectCategories, selectFormattedTime, selectSettings } from '../store/settingsSelectors'

const AnimatedGrid = motion(Grid)

const Result = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const selectedSettings = useAppSelector(selectSettings)
  const { amount, category, type, difficulty } = selectedSettings
  const quizTime = useAppSelector(selectFormattedTime)
  const elapsedTime = useAppSelector(selectElapsedTime)
  const questions = useAppSelector(selectQuestions)
  const answers = useAppSelector(selectAnswers)
  const categories = useAppSelector(selectCategories)

  const selectedCategory = categories.find((c) => c.id === category)
  const [formattedMinutes, formattedSeconds] = formatTime(elapsedTime)
  const numberOfCorrectAnswers = countCorrectAnswers(questions, answers)

  const handleRestartQuiz = () => {
    dispatch(resetAnswers())
    navigate(ROUTES.quiz)
  }

  const handleChooseAnotherQuiz = () => {
    dispatch(resetSettings())
    dispatch(resetQuiz())
    navigate(ROUTES.root)
  }

  return (
    <AnimatedGrid
      item
      xs={8}
      md={8}
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Paper elevation={3}>
        <Box padding={2}>
          <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
            Thank you for completing this quiz
          </Typography>
          <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
            Here are your results:
          </Typography>
        </Box>

        <Box
          padding={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '0'
          }}>
          <Typography variant="subtitle1" component="p" color="secondary">
            You answered {numberOfCorrectAnswers} out of {amount} questions correctly
          </Typography>
        </Box>

        <Box
          padding={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom color="textSecondary">
              Quiz Configuration:
            </Typography>
            <Divider />
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary={`Category: ${!selectedCategory ? 'any' : selectedCategory.name}`}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Difficulty: ${difficulty === '' ? 'any' : difficulty}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Type: ${type === '' ? 'any' : type}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`Time: ${quizTime} minutes`} />
            </ListItem>
          </List>
        </Box>

        <Box padding={2}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ textAlign: 'center' }}
            color="textSecondary">
            Time spent: {formattedMinutes}:{formattedSeconds}
          </Typography>
        </Box>

        <Box
          padding={3}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '0'
          }}>
          <Button onClick={handleRestartQuiz} variant="contained" color="primary">
            Restart
          </Button>
          <Button onClick={handleChooseAnotherQuiz} variant="outlined" color="secondary">
            Another Quiz
          </Button>
        </Box>
      </Paper>
    </AnimatedGrid>
  )
}

export default Result
