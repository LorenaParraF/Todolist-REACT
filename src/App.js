import React, { useState, useEffect } from "react";
import "./App.css";

//Components
import Header from "./components/Header";
import Loader from "./components/Loader";

import Todo from "./components/Todo";

//Styles
import "./styles/App.css";
import "./styles/Buttons.css";

const App = () => {
  // states
  const [todoList, setTodoList] = useState([]);

  // efect
  useEffect(() => {
    const handleTodoList = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const result = await response.json();
      const resultTodoList = result.slice(0, 20);
      setTodoList(resultTodoList);
    };
    handleTodoList();
  }, []);

  const handleCompleteTodo = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const complete = todoList.filter((item) => !item.completed);

  const incomplete = todoList.filter((item) => !!item.completed);

  return (
    <div className="App">
      <Header />
      <>
        <div className="Buttons">
          <li className="button">
            {" "}
            <button onClick={() => {}}>Todas {todoList.length}</button>
          </li>
          <li>
            <button onClick={() => {}}>Completados {complete.length}</button>
          </li>
          <li>
            <button onClick={() => {}}>Incompletos {incomplete.length}</button>
          </li>
        </div>
      </>

      <div className="todo-container">
        {todoList.map((singleTodo) => (
          <Todo
            key={singleTodo.id}
            title={singleTodo.title}
            status={singleTodo.completed}
            handleCompleteTodo={handleCompleteTodo}
            id={singleTodo.id}
          />
        ))}
        : (
        <Loader />)
      </div>
    </div>
  );
};

export default App;
