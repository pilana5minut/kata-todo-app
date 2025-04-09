/* eslint-disable no-unused-vars */
import { useContext } from 'react'

import { TaskContext } from '../../contexts/TaskContext'
import Task from '../Task'

export default function TaskList({ onRemoveTask, onCompletedTaskChange }) {
  const { renderList } = useContext(TaskContext)

  return (
    <ul className="todo-list">
      {renderList.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onRemoveTask={onRemoveTask}
            onCompletedTaskChange={onCompletedTaskChange}
          ></Task>
        )
      })}
    </ul>
  )
}
