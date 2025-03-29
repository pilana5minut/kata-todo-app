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

  const handleStartTimer = () => {
    startTimeRef.current = Date.now()
    timerIdRef.current = setInterval(() => {
      differenceTimeRef.current = Date.now() - startTimeRef.current + delayedTimeRef.current
      setTimerValue(new Date(differenceTimeRef.current - 10_800_000).toLocaleString('ru', formatTimer))
    }, 1000)
  }

  const handlePauseTimer = () => {
    clearInterval(timerIdRef.current)
    delayedTimeRef.current = differenceTimeRef.current
  }

  useEffect(() => {
    return () => {
      clearInterval(timerIdRef.current)
    }
  }, [])

  return (
    <span className="description">
      <button onClick={handleStartTimer} className="icon icon-play"></button>
      <button onClick={handlePauseTimer} className="icon icon-pause"></button>
      {timerValue}
    </span>
  )
}
