import { useState } from 'react'

export default function NewTaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddTask(inputValue)
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
