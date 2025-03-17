import Task from '../Task'

export default function TaskList({ renderList, onRemoveTask, onCompletedTaskChange }) {
  return (
    <ul className="todo-list">
      {renderList.map((task) => {
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
