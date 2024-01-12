import '../styles/Todos.css'
import { SetProjectPropsType } from '../types/props'
import TodoCard from './TodoCard'
import Panel from './ui/Panel'

const Todos = (props: SetProjectPropsType) => {
  const todos = props.project.todos.filter(t => !t.completed)
  const completedTodos = props.project.todos.filter(t => t.completed)

  return (
    <Panel className='todos'>
      <h2>Todos</h2>
      <div>
        {todos.length ? (
          todos.map(singleTodo => (
            <TodoCard 
              key={String(singleTodo.id)} 
              singleTodo={singleTodo}
              project={props.project}
              setProject={props.setProject}
            />
          ))
        ) : (
          <p>No todos!</p>
        )}
      </div>

      <h2>Completed Todos</h2>
      <div>
        {completedTodos.length ? (
          completedTodos.map(singleTodo => (
            <TodoCard 
              key={String(singleTodo.id)} 
              singleTodo={singleTodo} 
              project={props.project}
              setProject={props.setProject}
            />
          ))
        ) : (
          <p>No completed todos!</p>
        )}
      </div>
    </Panel>
  )
}

export default Todos