import React, { useState, useEffect } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'

import { formatTime } from '../utils/utils'

export const Timer = ({ totalTime, pause, onTimerFinish, onTimerUpdate }) => {
  const [remainingTime, setRemainingTime] = useState(totalTime)

  useEffect(() => {
    if (pause) return

    let interval = 1000

    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - interval : 0))
      onTimerUpdate(remainingTime - interval)

      if (remainingTime === 0) {
        onTimerFinish()
        clearInterval(timerInterval)
      }
    }, interval)

    return () => clearInterval(timerInterval)
  }, [remainingTime, onTimerFinish, pause])

  const progressPercentage = ((remainingTime / totalTime) * 100).toFixed(2)

  const [formattedMinutes, formattedSeconds] = formatTime(remainingTime)

  return (
    <Box padding={1}>
      <LinearProgress
        variant="determinate"
        value={progressPercentage}
        style={{ marginBottom: '10px' }}
      />
      <Typography variant="body1" align="center" color="textSecondary">
        {`${formattedMinutes}:${formattedSeconds}`}
      </Typography>
    </Box>
  )
}
