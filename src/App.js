import React, { useState } from "react";
import Header from "./Header";
import Main from "./Todolist";
import Todocheck from "./Todocheck";
import "./App.css";

function App() {
  const initialState = [
    { id: crypto.randomUUID(), content: "춤 추기", completed: true },
    { id: crypto.randomUUID(), content: "리액트 공부", completed: false },
  ];

  const [todoList, setTodoList] = useState(initialState);

  function addTodo(content) {
    const newTodo = {
      id: crypto.randomUUID(),
      content: content,
      completed: false,
    };
    setTodoList((old) => [...old, newTodo]);
  }

  function deleteTodo(targetId) {
    setTodoList((old) => old.filter((todo) => todo.id !== targetId));
  }

  return (
    <section className="todoapp">
      <div>
        <Header addTodo={addTodo} />
        <Main todoList={todoList} deleteTodo={deleteTodo} />
        <Todocheck />
      </div>
    </section>
  );
}

export default App;
