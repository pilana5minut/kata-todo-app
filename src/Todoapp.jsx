import { useState } from 'react'
import { nanoid } from 'nanoid'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

export default function Todoapp() {
  const [taskList, setTaskList] = useState([])

  const handleAddTask = (text) => {
    setTaskList([
      ...taskList,
      {
        id: nanoid(5),
        content: text,
        isCompleted: false,
      },
    ])
  }

  const handleCompletedTaskChange = (taskId) => {
    setTaskList(
      taskList.map((task) => {
        return task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : { ...task }
      })
    )
  }

  const handleRemoveTask = (taskId) => {
    setTaskList(taskList.filter((task) => task.id !== taskId))
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={handleAddTask} />
      </header>
      <section className="main">
        <TaskList
          taskList={taskList}
          onCompletedTaskChange={handleCompletedTaskChange}
          onRemoveTask={handleRemoveTask}
        />
        <Footer />
      </section>
    </section>
  )
}
