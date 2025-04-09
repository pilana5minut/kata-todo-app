/* eslint-disable no-unused-vars */
import cn from 'classnames'
import { useContext } from 'react'

import { TaskContext } from '../../contexts/TaskContext'

export default function TasksFilter() {
  const { filterState, handleShowAllTasks, handleShowActiveTasks, handleShowCompletedTasks } = useContext(TaskContext)

  return (
    <ul className="filters">
      <li>
        <button className={cn({ selected: filterState === 'ShowAllTasks' })} onClick={handleShowAllTasks}>
          All
        </button>
      </li>
      <li>
        <button className={cn({ selected: filterState === 'ShowActiveTasks' })} onClick={handleShowActiveTasks}>
          Active
        </button>
      </li>
      <li>
        <button className={cn({ selected: filterState === 'ShowCompletedTasks' })} onClick={handleShowCompletedTasks}>
          Completed
        </button>
      </li>
    </ul>
  )
}
