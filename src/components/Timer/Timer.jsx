/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'

const formatTimer = {
  minute: 'numeric',
  second: 'numeric',
  hour: 'numeric',
}

export default function Timer() {
  const [timerValue, setTimerValue] = useState('00:00:00')
  const timerIdRef = useRef(null)
  const startTimeRef = useRef(null)
  const differenceTimeRef = useRef(null)
  const delayedTimeRef = useRef(null)

  useEffect(() => {
    console.log('🚥 Timer useEffect  🚥')
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(timerIdRef.current)
    }
  }, [])

  const handleVisibilityChange = () => {
    if (document.hidden) {
      console.log('🚥 document.hidden true 🚥', document.hidden)
      clearInterval(timerIdRef.current)
      console.log('🚥 timerIdRef.current  🚥', timerIdRef.current)
    } else {
      console.log('🚥 document.hidden false 🚥', document.hidden)
      updateTimerValue()
    }
  }

  const updateTimerValue = () => {
    console.log('🚥 Function updateTimerValue  🚥')
    timerIdRef.current = setInterval(() => {
      console.log('🚥 setInterval  🚥')
      differenceTimeRef.current = Date.now() - startTimeRef.current + delayedTimeRef.current
      setTimerValue(new Date(differenceTimeRef.current - 10_800_000).toLocaleString('ru', formatTimer))
    }, 1000)
  }

  const handleStartTimer = () => {
    startTimeRef.current = Date.now()
    updateTimerValue()
  }

  const handlePauseTimer = () => {
    console.log('🚥 handlePauseTimer  🚥')
    clearInterval(timerIdRef.current)
    console.log('🚥 timerIdRef.current  🚥', timerIdRef.current)
    delayedTimeRef.current = differenceTimeRef.current
  }

  return (
    <span className="description">
      <button onClick={handleStartTimer} className="icon icon-play"></button>
      <button onClick={handlePauseTimer} className="icon icon-pause"></button>
      {timerValue}
    </span>
  )
}
