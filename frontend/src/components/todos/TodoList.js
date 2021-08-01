import React from "react";
import classes from "./TodoList.module.css";
import Card from "../UI/Card";
import TodoItem from "./TodoItem";

function TodoList(props) {
  const hasNoTodos = !props.todos || props.todos.length === 0;

  return (
    <section className={classes.todoList}>
      <Card>
        <h2>Your Todos</h2>
        {hasNoTodos && <h2>No Todos found. Start adding yours!</h2>}
        <ul>
          {props.todos.map((todo) => (
            <TodoItem
              key={todo.ID}
              ID={todo.ID}
              content={todo.content}
              onUpdateTodo={props.onUpdateTodo}
              onDeleteTodo={props.onDeleteTodo}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default TodoList;
