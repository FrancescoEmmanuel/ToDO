import React from 'react'
import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo, title, date }) {
  return (
    
    <div className="bg-zinc-800 p-4 rounded">
        <ul>
            {todos.length === 0 && "Nothing to do for "+ {title}}
            {todos.map((todo, id) => {
            return (
         
              <TodoItem
                {...todo}
                key={todo.id}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
      
            
            );})}

        </ul>
    </div>  
  )
}

export default TodoList