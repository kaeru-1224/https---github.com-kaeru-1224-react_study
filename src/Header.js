import React, { useState } from "react";
import useTodoListAtom from "./state";

function Header() {
  const { addTodo } = useTodoListAtom();

  const [todoInput, setTodoInput] = useState("");

  function handleChange(e) {
    setTodoInput(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      addTodo(todoInput);
      setTodoInput("");
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoInput}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </header>
  );
}

export default Header;
