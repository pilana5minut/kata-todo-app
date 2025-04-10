import { useState } from 'react'
import { nanoid } from 'nanoid'

import { TaskContext } from './contexts/TaskContext'
import NewTaskForm from './components/NewTaskForm'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

export default function Todoapp() {
  const [taskList, setTaskList] = useState(initialList)
  const [filterState, setFilterState] = useState('ShowAllTasks')

  const handleAddTask = (text) => {
    setTaskList([
      ...taskList,
      {
        id: nanoid(5),
        content: text,
        isCompleted: false,
        creationTime: new Date(),
        timerIsRunning: false,
        timerStartTime: 0,
        timerAccumulatedTime: 0,
      },
    ])
  }

  const handleTimerState = (taskId, state) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => {
        return task.id === taskId ? { ...task, timerIsRunning: state } : { ...task }
      })
    })
  }

  const handleSetTimerStartTime = (taskId, timestamp) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => {
        return task.id === taskId ? { ...task, timerStartTime: timestamp } : { ...task }
      })
    })
  }

  const handleSetTimerAccumulatedTime = (taskId, timestamp) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) => {
        return task.id === taskId ? { ...task, timerAccumulatedTime: timestamp } : { ...task }
      })
    })
  }

  const handleCompletedTaskChange = (taskId) => {
    setTaskList(
      taskList.map((task) => {
        return task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : { ...task }
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

  const numberOfPendingTasks = taskList.filter((task) => !task.isCompleted).length

  return (
    <TaskContext.Provider
      value={{
        renderList,
        filterState,
        numberOfPendingTasks,
        handleAddTask,
        handleCompletedTaskChange,
        handleRemoveTask,
        handleRemoveAllCompletedTask,
        handleShowAllTasks,
        handleShowActiveTasks,
        handleShowCompletedTasks,
        handleTimerState,
        handleSetTimerStartTime,
        handleSetTimerAccumulatedTime,
      }}
    >
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </TaskContext.Provider>
  )
}

const initialList = [
  {
    id: nanoid(5),
    content: 'text',
    isCompleted: false,
    creationTime: new Date(),
    timerIsRunning: false,
    timerStartTime: 0,
    timerAccumulatedTime: 0,
  },
]
