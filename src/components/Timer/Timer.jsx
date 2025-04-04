import { useEffect, useRef, useState } from 'react'

const formatTimer = {
  minute: 'numeric',
  second: 'numeric',
}

export default function Timer({ taskCompleted }) {
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
    if (taskCompleted) {
      handlePauseTimer()
    }
  }, [taskCompleted])

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
    }, 1000)
  }

  const handleStartTimer = () => {
    if (!taskCompleted) {
      if (!isRunningRef.current) {
        isRunningRef.current = true
        startTimeRef.current = Date.now()
        updateTimerValue()
      }
    }
  }

  const handlePauseTimer = () => {
    isRunningRef.current = false
    delayedTimeRef.current = differenceTimeRef.current
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
