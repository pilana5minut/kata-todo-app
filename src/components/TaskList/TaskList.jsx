/* eslint-disable no-unused-vars */
import { useContext } from 'react'

import { TaskContext } from '../../contexts/TaskContext'
import Task from '../Task'

export default function TaskList() {
  const { renderList, handleRemoveTask, handleCompletedTaskChange } = useContext(TaskContext)

  return (
    <ul className="todo-list">
      {renderList.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onRemoveTask={handleRemoveTask}
            onCompletedTaskChange={handleCompletedTaskChange}
          ></Task>
        )
      })}
    </ul>
  )
}
