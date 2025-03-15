import cn from 'classnames'

export default function TasksFilter({
  filterState,
  onShowAllTasks,
  onShowActiveTasks,
  onShowCompletedTasks,
}) {
  return (
    <ul className="filters">
      <li>
        <button
          className={cn({ selected: filterState === 'ShowAllTasks' })}
          onClick={onShowAllTasks}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={cn({ selected: filterState === 'ShowActiveTasks' })}
          onClick={onShowActiveTasks}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={cn({ selected: filterState === 'ShowCompletedTasks' })}
          onClick={onShowCompletedTasks}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
