/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react'

import { TaskContext } from '../../contexts/TaskContext'

export default function NewTaskForm() {
  const { handleAddTask } = useContext(TaskContext)

  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddTask(inputValue)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </form>
  )
}
