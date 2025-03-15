import TasksFilter from '../TasksFilter'

export default function Footer({
  filterState,
  numberOfPendingTasks,
  onShowAllTasks,
  onShowActiveTasks,
  onShowCompletedTasks,
  onRemoveAllCompletedTask,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{numberOfPendingTasks} items left</span>
      <TasksFilter
        filterState={filterState}
        onShowAllTasks={onShowAllTasks}
        onShowActiveTasks={onShowActiveTasks}
        onShowCompletedTasks={onShowCompletedTasks}
      />
      <button
        className="clear-completed"
        onClick={onRemoveAllCompletedTask}
      >
        Clear completed
      </button>
    </footer>
  )
}
