import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import {
  Grid,
  Paper,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { ROUTES } from '../navigation/router'
import {
  selectByCategory,
  selectByDifficulty,
  selectByType,
  selectCorrectAnswers,
  selectTotalQuestions
} from '../store/statisticsSelectors'

const Statistics = () => {
  const navigate = useNavigate()

  const totalQuestions = useSelector(selectTotalQuestions)
  const correctAnswers = useSelector(selectCorrectAnswers)
  const questionsByCategory = useSelector(selectByCategory)
  const questionsByDifficulty = useSelector(selectByDifficulty)
  const questionsByType = useSelector(selectByType)

  const handleBackToQuiz = () => {
    navigate(ROUTES.root)
  }

  return (
    <Grid item xs={8} md={8}>
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

        <Box sx={{ width: '80%', margin: 'auto' }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                By category:
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {Object.entries(questionsByCategory).map(([category, count]) => (
                  <ListItem key={category}>
                    <ListItemText primary={`${category}: ${count}`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                By difficulty:
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {Object.entries(questionsByDifficulty).map(([difficulty, count]) => (
                  <ListItem key={difficulty}>
                    <ListItemText primary={`${difficulty}: ${count}`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                By type:
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {Object.entries(questionsByType).map(([type, count]) => (
                  <ListItem key={type}>
                    <ListItemText primary={`${type}: ${count}`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
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
    </Grid>
  )
}

export default Statistics
