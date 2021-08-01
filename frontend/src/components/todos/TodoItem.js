import React from "react";

import classes from "./TodoItem.module.css";

function TodoItem(props) {
  return (
    <li className={classes.todoItem}>
      {props.content}
      <div className={classes.container}>
        <button
          className={classes.updateButton}
          onClick={props.onUpdateTodo.bind(null, props.ID, props.content)}
        >
          Update
        </button>
        <button
          className={classes.deleteButton}
          onClick={props.onDeleteTodo.bind(null, props.ID)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
//onClick={props.onDelete.bind(null, props.id)}
