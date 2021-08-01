import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import TodoInput from "./components/todos/TodoInput";
import TodoList from "./components/todos/TodoList";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Modal from "./components/UI/Modal";
import UpdateTodoCard from "./components/UI/UpdateTodoCard";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedTodos, setLoadedTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [todoId, setTodoId] = useState();
  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const [todoContent, setTodoContent] = useState("");

  const FETCHQUERY = gql`
    {
      allTodos {
        edges {
          node {
            ID
            content
          }
        }
      }
    }
  `;

  const ADDQUERY = gql`
    mutation {
      addTodo(content: "${todoText}") {
        todo {
          ID
          content
        }
      }
    }
  `;

  const DELETEQUERY = gql`
    mutation {
      deleteTodo(ID: ${todoId}) {
        success
        errors
        ID
      }
    }
  `;

  const UPDATEQUERY = gql`
    mutation {
      updateTodo(ID: ${todoId}, content: "${todoContent}") {
        success
        errors
        content
        ID
      }
    }
  `;

  const { data } = useQuery(FETCHQUERY);
  const [addTodo] = useMutation(ADDQUERY, {
    update: (cache, { data: { addTodo } }) => {
      const todos = cache.readQuery({ query: FETCHQUERY });
      var temp = [];
      for (let i = 0; i < todos.allTodos.edges.length; i++) {
        temp[i] = todos.allTodos.edges[i].node;
      }
      temp[todos.allTodos.edges.length] = addTodo.todo;
      setLoadedTodos(temp);
      cache.writeQuery({
        query: FETCHQUERY,
        data: { allTodos: temp },
      });
    },
  });

  const [deleteTodo] = useMutation(DELETEQUERY, {
    update: (cache, { data: { deleteTodo } }) => {
      const todos = cache.readQuery({ query: FETCHQUERY });
      var temp = [];
      for (let i = 0; i < todos.allTodos.edges.length; i++) {
        temp[i] = todos.allTodos.edges[i].node;
      }
      temp.filter((todo) => todo.ID !== deleteTodo.ID);
      setLoadedTodos(temp);
      cache.writeQuery({
        query: FETCHQUERY,
        data: { allTodos: temp },
      });
    },
  });

  const [updateTodo] = useMutation(UPDATEQUERY, {
    update: (cache) => {
      const todos = cache.readQuery({ query: FETCHQUERY });
      var temp = [];
      for (let i = 0; i < todos.allTodos.edges.length; i++) {
        temp[i] = todos.allTodos.edges[i].node;
      }
      setLoadedTodos(temp);
      cache.writeQuery({
        query: FETCHQUERY,
        data: { allTodos: temp },
      });
    },
  });

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        if (data !== undefined) {
          var temp = [];
          for (let i = 0; i < data.allTodos.edges.length; i++)
            temp[i] = data.allTodos.edges[i].node;
          setLoadedTodos(temp);
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [data]
  );

  async function addTodoHandler(enteredTodoText) {
    setIsLoading(true);
    await setTodoText(enteredTodoText);
    await addTodo({
      variables: { todoText },
    });
    setIsLoading(false);
  }

  async function updateTodoContent(updatedTodoId, todoText) {
    setShowUpdateCard(true);
    await setTodoId(updatedTodoId);
    await setTodoContent(todoText);
  }

  async function updateTodoHandler(newTodoContent) {
    await setTodoContent(newTodoContent);
    await updateTodo({
      variables: { todoId, newTodoContent },
    });
    setShowUpdateCard(false);
  }

  async function deleteTodoHandler(deletedTodoId) {
    setIsLoading(true);
    await setTodoId(deletedTodoId);
    await deleteTodo({ variables: { todoId } });
    setIsLoading(false);
  }

  function handleCloseModal(e) {
    e.stopPropagation();
    setShowUpdateCard(false);
  }

  return (
    <div>
      <TodoInput onAddTodo={addTodoHandler} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <TodoList
          todos={loadedTodos}
          onUpdateTodo={updateTodoContent}
          onDeleteTodo={deleteTodoHandler}
        />
      )}
      {showUpdateCard && (
        <Modal>
          <UpdateTodoCard
            onUpdateTodo={updateTodoHandler}
            oldContent={todoContent}
            onHide={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
