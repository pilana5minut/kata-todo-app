import { useState } from 'react'
import { nanoid } from 'nanoid'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

export default function Todoapp() {
  const [taskList, setTaskList] = useState([])
  const [filterState, setFilterState] = useState('ShowAllTasks')

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

  const handleRemoveAllCompletedTask = () => {
    setTaskList(taskList.filter((task) => !task.isCompleted))
  }

  const handleShowAllTasks = () => {
    setFilterState('ShowAllTasks')
  }

  const handleShowActiveTasks = () => {
    setFilterState('ShowActiveTasks')
  }

  const handleShowCompletedTasks = () => {
    setFilterState('ShowCompletedTasks')
  }

  const renderList = taskList.filter((task) => {
    if (filterState === 'ShowActiveTasks') {
      return !task.isCompleted
    }
    if (filterState === 'ShowCompletedTasks') {
      return task.isCompleted
    }
    return true
  })

  const numberOfPendingTasks = taskList.filter(
    (task) => !task.isCompleted
  ).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={handleAddTask} />
      </header>
      <section className="main">
        <TaskList
          renderList={renderList}
          onRemoveTask={handleRemoveTask}
          onCompletedTaskChange={handleCompletedTaskChange}
        />
        <Footer
          filterState={filterState}
          numberOfPendingTasks={numberOfPendingTasks}
          onRemoveAllCompletedTask={handleRemoveAllCompletedTask}
          onShowAllTasks={handleShowAllTasks}
          onShowActiveTasks={handleShowActiveTasks}
          onShowCompletedTasks={handleShowCompletedTasks}
        />
      </section>
    </section>
  )
}
