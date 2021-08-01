import React, { useEffect } from "react";
import { useState } from "react";
import classes from "./UpdateTodoCard.module.css";
import Card from "./Card";

function UpdateTodoCard(props) {
  const [enteredTodoText, setEnteredTodoText] = useState("");

  function todoTextHandler(event) {
    setEnteredTodoText(event.target.value);
  }

  function todoSubmitHandler(event) {
    event.preventDefault();
    props.onUpdateTodo(enteredTodoText);
  }

  useEffect(() => {
    setEnteredTodoText(props.oldContent);
  }, [props.oldContent]);

  return (
    <section className={classes.todoInput}>
      <Card>
        <form onSubmit={todoSubmitHandler}>
          <label htmlFor="text">Update Todo</label>
          <input
            type="text"
            id="text"
            value={enteredTodoText || props.oldContent}
            onChange={todoTextHandler}
          />
          <button type="submit" className={classes.customButton}>
            Update
          </button>
          <button className={classes.customButton} onClick={props.onHide}>
            Close
          </button>
        </form>
      </Card>
    </section>
  );
}

export default UpdateTodoCard;
