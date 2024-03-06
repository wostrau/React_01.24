import React, { useEffect, useState } from 'react'
import { Button, Box, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { setQuestions, updateAnswers, updateTimer } from '../store/quizReducer'
import { selectAnswers, selectQuestions } from '../store/quizSelectors'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateStatistics } from '../store/statisticsReducer'
import { triviaApi } from '../store/triviaApi'
import { selectSettings } from '../store/settingsSelectors'
import { shuffleAnswers } from '../utils/utils'
import { Loader } from '../components/Loader'
import { ROUTES } from '../navigation/router'
import { Modal } from '../components/Modal'
import { Timer } from '../components/Timer'

const AnimatedGrid = motion(Grid)

const Quiz: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [questionIndex, setQuestionIndex] = useState(0)
  const [isPause, setIsPause] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const settings = useAppSelector(selectSettings)
  const { amount, time } = settings

  const { data, isLoading } = triviaApi.useFetchQuestionsQuery(settings)

  const questions = useAppSelector(selectQuestions)
  const answers = useAppSelector(selectAnswers)

  useEffect(() => {
    if (data) {
      dispatch(setQuestions(data))
      setIsPause(false)
    }
  }, [data, dispatch])

  const handleAnswerClick = (question: string, answer: string) => {
    dispatch(updateAnswers({ question, answer }))

    if (questionIndex < amount - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handleTimerUpdate = (remainingTime: number) => {
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
    <AnimatedGrid
      item
      xs={8}
      md={8}
      key="quiz"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Paper elevation={3}>
        {isOpen && <Modal onCancel={handleResumeQuiz} onConfirm={handleEndQuiz} />}

        {isLoading && <Loader />}

        {!isLoading && Array.isArray(questions) && questions[questionIndex] && (
          <>
            <Box padding={2}>
              <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
                {questions[questionIndex].question}
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
                {`question ${questionIndex + 1} / ${amount}`}
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
                questions[questionIndex] &&
                shuffleAnswers([
                  ...questions[questionIndex].incorrect_answers,
                  questions[questionIndex].correct_answer
                ]).map((answer, index) => (
                  <Box
                    key={index}
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
                      onClick={() => handleAnswerClick(questions[questionIndex].question, answer)}
                      disabled={answers.length > questionIndex}>
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
    </AnimatedGrid>
  )
}

export default Quiz
