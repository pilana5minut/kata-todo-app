import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

export default function Todoapp() {
  return (
    <section className="todoapp">
      <header class="header">
        <h1>todos</h1>
        <NewTaskForm></NewTaskForm>
      </header>
      <section className="main">
        <TaskList></TaskList>
        <Footer></Footer>
      </section>
    </section>
  )
}
