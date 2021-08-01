import React, { useState } from "react";

import classes from "./TodoInput.module.css";
import Card from "../UI/Card";

function TodoInput(props) {
  const [enteredTodoText, setEnteredTodoText] = useState("");

  function todoTextHandler(event) {
    setEnteredTodoText(event.target.value);
  }

  function todoSubmitHandler(event) {
    event.preventDefault();

    if (enteredTodoText.trim().length === 0) {
      alert("Invalid text!");
      return;
    }

    props.onAddTodo(enteredTodoText);

    setEnteredTodoText("");
  }

  return (
    <section className={classes.todoInput}>
      <Card>
        <form onSubmit={todoSubmitHandler}>
          <label htmlFor="text">New Todo</label>
          <input
            type="text"
            id="text"
            value={enteredTodoText}
            onChange={todoTextHandler}
          />
          <button>+ Add</button>
        </form>
      </Card>
    </section>
  );
}

export default TodoInput;
