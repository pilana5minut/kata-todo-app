import Task from '../Task'

export default function TaskList({
  taskList,
  onRemoveTask,
  onCompletedTaskChange,
}) {
  return (
    <ul className="todo-list">
      {taskList.map((task) => {
        return (
          <Task
            {...task}
            key={task.id}
            onRemoveTask={onRemoveTask}
            onCompletedTaskChange={onCompletedTaskChange}
          ></Task>
        )
      })}
    </ul>
  )
}
