import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import ListItem from '@mui/material/ListItem'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { useAppSelector } from '../store/hooks'
import { ROUTES } from '../navigation/router'
import {
  selectByCategory,
  selectByDifficulty,
  selectByType,
  selectCorrectAnswers,
  selectTotalQuestions
} from '../store/statisticsSelectors'

const AnimatedGrid = motion(Grid)
const AnimatedAccordion = motion(Accordion)

const Statistics: React.FC = () => {
  const navigate = useNavigate()

  const questionsByDifficulty = useAppSelector(selectByDifficulty)
  const questionsByCategory = useAppSelector(selectByCategory)
  const totalQuestions = useAppSelector(selectTotalQuestions)
  const correctAnswers = useAppSelector(selectCorrectAnswers)
  const questionsByType = useAppSelector(selectByType)

  const handleBackToQuiz = () => {
    navigate(ROUTES.root)
  }

  return (
    <AnimatedGrid
      item
      xs={8}
      md={8}
      key="statistics"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Paper elevation={3}>
        <Box padding={2}>
          <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
            Your statistics:
          </Typography>
        </Box>

        <Box padding={1}>
          <Typography
            variant="subtitle1"
            component="p"
            color="secondary"
            sx={{ textAlign: 'center' }}
            gutterBottom>
            Total amount of questions: {totalQuestions}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            color="secondary"
            sx={{ textAlign: 'center' }}
            gutterBottom>
            Amount of given correct answers: {correctAnswers}
          </Typography>
        </Box>

        <Box padding={2} sx={{ width: '80%', margin: 'auto' }}>
          <AnimatedAccordion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                By category:
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {Object.entries(questionsByCategory).map(([category, count]) => (
                  <ListItem key={category}>
                    <ListItemText>
                      <Typography variant="body2">{`${category}: ${count}`}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </AnimatedAccordion>

          <AnimatedAccordion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                By difficulty:
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {Object.entries(questionsByDifficulty).map(([difficulty, count]) => (
                  <ListItem key={difficulty}>
                    <ListItemText>
                      <Typography variant="body2">{`${difficulty}: ${count}`}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </AnimatedAccordion>

          <AnimatedAccordion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                By type:
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {Object.entries(questionsByType).map(([type, count]) => (
                  <ListItem key={type}>
                    <ListItemText>
                      <Typography variant="body2">{`${type}: ${count}`}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </AnimatedAccordion>
        </Box>

        <Box
          padding={2}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Button variant="contained" color="primary" onClick={handleBackToQuiz}>
            Back to Quiz
          </Button>
        </Box>
      </Paper>
    </AnimatedGrid>
  )
}

export default Statistics
