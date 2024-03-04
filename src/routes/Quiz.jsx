import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Box, Grid, Paper, Typography } from '@mui/material'

import { Modal } from '../components/Modal'
import { ROUTES } from '../navigation/router'
import { shuffleAnswers } from '../utils/utils'
import { useFetchQuestionsQuery } from '../store/triviaApi'
import { selectSettings } from '../store/settingsSelectors'
import { Timer } from '../components/Timer'
import { setQuestions, updateAnswers, updateTimer } from '../store/quizReducer'
import { selectAnswers, selectQuestions } from '../store/quizSelectors'
import { updateStatistics } from '../store/statisticsReducer'
import { Loader } from '../components/Loader'

const Quiz = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [index, setIndex] = useState(0)
  const [isPause, setIsPause] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const settings = useSelector(selectSettings)
  const { data, isLoading } = useFetchQuestionsQuery(settings)
  const { amount, time } = settings
  const questions = useSelector(selectQuestions)
  const answers = useSelector(selectAnswers)

  useEffect(() => {
    if (data) {
      dispatch(setQuestions(data))
      setIsPause(false)
    }
  }, [data, dispatch])

  const handleAnswerClick = (question, answer) => {
    dispatch(updateAnswers({ question, answer }))

    if (index < amount - 1) {
      setIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleTimerUpdate = (remainingTime) => {
    const elapsedTime = time - remainingTime
    dispatch(updateTimer({ elapsedTime }))
  }

  const handleEndQuiz = () => {
    dispatch(updateStatistics({ questions, answers }))
    navigate(ROUTES.result)
  }

  const handleResumeQuiz = () => {
    setIsOpen(false)
    setIsPause(false)
  }

  const handlePauseQuiz = () => {
    setIsOpen(true)
    setIsPause(true)
  }

  return (
    <Grid item xs={8}>
      <Paper elevation={3}>
        {isOpen && <Modal onCancel={handleResumeQuiz} onConfirm={handleEndQuiz} />}

        {isLoading && <Loader />}

        {Array.isArray(questions) && questions[index] && (
          <>
            <Box padding={2}>
              <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
                {questions[index].question}
              </Typography>
            </Box>

            <Box
              padding={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0'
              }}>
              <Typography variant="caption" component="p" color="textSecondary">
                {`question ${index + 1} / ${amount}`}
              </Typography>
            </Box>

            <Box
              padding={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                paddingTop: '0'
              }}>
              {Array.isArray(questions) &&
                questions[index] &&
                shuffleAnswers([
                  ...questions[index].incorrect_answers,
                  questions[index].correct_answer
                ]).map((answer, index) => (
                  <Box
                    padding={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                    <Button
                      style={{ width: '100%' }}
                      variant="outlined"
                      color="primary"
                      key={index}
                      onClick={() => handleAnswerClick(questions[index].question, answer)}
                      disabled={answers.length > index + 1}>
                      {answer}
                    </Button>
                  </Box>
                ))}
            </Box>
          </>
        )}

        <Box padding={2}>
          <Timer
            totalTime={time}
            pause={isPause}
            onTimerFinish={handleEndQuiz}
            onTimerUpdate={handleTimerUpdate}
          />
        </Box>

        <Box
          padding={2}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Button variant="contained" color="secondary" onClick={handlePauseQuiz}>
            End Quiz
          </Button>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Quiz
