import React, { useState, useEffect } from 'react'

import styles from './TimerWithProgressBar.module.css'
import { formatTime } from '../utils/utils'

export const TimerWithProgressBar = ({ totalTime, pause, onTimerFinish, onTimerUpdate }) => {
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
    <div className={styles.timerContainer}>
      <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
      <div className={styles.timerDisplay}>{`${formattedMinutes}:${formattedSeconds}`}</div>
    </div>
  )
}
