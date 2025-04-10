/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from 'react'

import { TaskContext } from '../../contexts/TaskContext'

const formatTimer = {
  minute: 'numeric',
  second: 'numeric',
}

export default function Timer({ task }) {
  const { handleSetTimerStartTime, handleSetTimerAccumulatedTime } = useContext(TaskContext)

  const timerIdRef = useRef(null)
  const startTimeRef = useRef(null)
  const differenceTimeRef = useRef(null)
  const delayedTimeRef = useRef(null)
  const isRunningRef = useRef(false)
  const [timerValue, setTimerValue] = useState('00:00')

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(timerIdRef.current)
    }
  }, [])

  useEffect(() => {
    if (task.isCompleted) {
      handlePauseTimer()
    }
  }, [task.isCompleted])

  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearInterval(timerIdRef.current)
    } else {
      if (isRunningRef.current) {
        updateTimerValue()
      }
    }
  }

  const updateTimerValue = () => {
    timerIdRef.current = setInterval(() => {
      differenceTimeRef.current = Date.now() - startTimeRef.current + delayedTimeRef.current

      if (differenceTimeRef.current > 3_600_000) {
        formatTimer.hour = 'numeric'
      }
      setTimerValue(new Date(differenceTimeRef.current - 10_800_000).toLocaleString('ru', formatTimer))
    }, 100)
  }

  const handleStartTimer = () => {
    if (!task.isCompleted) {
      if (!isRunningRef.current) {
        handleSetTimerStartTime(task.id, Date.now())
        isRunningRef.current = true
        startTimeRef.current = Date.now()
        updateTimerValue()
      }
    }
  }

  const handlePauseTimer = () => {
    isRunningRef.current = false
    delayedTimeRef.current = differenceTimeRef.current
    handleSetTimerAccumulatedTime(task.id, differenceTimeRef.current)
    clearInterval(timerIdRef.current)
  }

  return (
    <span className="description">
      <button onClick={handleStartTimer} className="icon icon-play"></button>
      <button onClick={handlePauseTimer} className="icon icon-pause"></button>
      {timerValue}
    </span>
  )
}
