import { useContext, useEffect, useRef, useState } from 'react'

import { TaskContext } from '../../contexts/TaskContext'

const formatTimer = {
  minute: 'numeric',
  second: 'numeric',
}

export default function Timer({ task }) {
  const timerIdRef = useRef(null)
  const startTimeRef = useRef(task.timerStartTime)
  const differenceTimeRef = useRef(task.timerAccumulatedTime)
  const [timerValue, setTimerValue] = useState('00:00')
  const { handleTimerState, handleSetTimerStartTime, handleSetTimerAccumulatedTime } = useContext(TaskContext)

  useEffect(() => {
    startTimeRef.current = task.timerStartTime
    differenceTimeRef.current = task.timerAccumulatedTime

    if (task.timerStartTime > 0) {
      setTimerValue(new Date(differenceTimeRef.current - 10_800_000).toLocaleString('ru', formatTimer))
    }

    if (task.timerIsRunning && task.timerStartTime > 0) {
      updateTimerValue()
    }

    return () => {
      clearInterval(timerIdRef.current)
    }
  }, [task.timerStartTime, task.timerIsRunning, task.timerAccumulatedTime])

  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(timerIdRef.current)
    }
  }, [task.timerStartTime, task.timerIsRunning])

  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (task.isCompleted) {
      handlePauseTimer()
    }
  }, [task.isCompleted])

  /////////////////////////////////////////////////////////////////////////////

  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearInterval(timerIdRef.current)
    } else {
      if (task.timerIsRunning && task.timerStartTime > 0) {
        updateTimerValue()
      }
    }
  }

  const updateTimerValue = () => {
    timerIdRef.current = setInterval(() => {
      differenceTimeRef.current = Date.now() - startTimeRef.current + task.timerAccumulatedTime

      if (differenceTimeRef.current > 3_600_000) {
        formatTimer.hour = 'numeric'
      }
      setTimerValue(new Date(differenceTimeRef.current - 10_800_000).toLocaleString('ru', formatTimer))
    }, 100)
  }

  const handleStartTimer = () => {
    if (!task.isCompleted) {
      if (!task.timerIsRunning) {
        startTimeRef.current = Date.now()
        handleTimerState(task.id, true)
        handleSetTimerStartTime(task.id, Date.now())
        updateTimerValue()
      }
    }
  }

  const handlePauseTimer = () => {
    handleTimerState(task.id, false)
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
