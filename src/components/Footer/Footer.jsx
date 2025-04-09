/* eslint-disable no-unused-vars */
import { useContext } from 'react'

import { TaskContext } from '../../contexts/TaskContext'
import TasksFilter from '../TasksFilter'

export default function Footer() {
  const { numberOfPendingTasks, handleRemoveAllCompletedTask } = useContext(TaskContext)
  return (
    <footer className="footer">
      <span className="todo-count">{numberOfPendingTasks} items left</span>
      <TasksFilter />
      <button className="clear-completed" onClick={handleRemoveAllCompletedTask}>
        Clear completed
      </button>
    </footer>
  )
}
