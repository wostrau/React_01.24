// TimerWithProgressBar.js
import React, { useState, useEffect } from 'react';

import styles from './TimerWithProgressBar.module.css';

export const TimerWithProgressBar = ({ totalTime, onTimerFinish }) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));

      if (remainingTime === 0) {
        clearInterval(timerInterval);
        onTimerFinish();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [remainingTime, onTimerFinish]);

  const progressPercentage = ((remainingTime / totalTime) * 100).toFixed(2);

  const formattedMinutes = String(Math.floor(remainingTime / 60000)).padStart(2, '0');
  const formattedSeconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0');

  return (
    <div className={styles.timerContainer}>
      <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
      <div className={styles.timerDisplay}>{`${formattedMinutes}:${formattedSeconds}`}</div>
    </div>
  );
};
