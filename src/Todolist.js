import React, { useState } from "react";

function TodoItem({
  id,
  content,
  completed,
  deleteTodo,
  completeTodo,
  changeTodo,
}) {
  function handleDelete(e) {
    deleteTodo(id);
  }
  function handleComplete(e) {
    completeTodo(id);
  }

  const [editing, setEditing] = useState(false);

  function handleDoubleClick() {
    setEditing(true);
  }

  function handleBlur() {
    setEditing(false);
  }

  const [editingInput, setEditingInput] = useState(content);

  function handleChange(e) {
    setEditingInput(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      changeTodo(id, editingInput);
      setEditing(false);
    }
  }

  return (
    <li
      className={
        (completed ? "completed" : "") + " " + (editing ? "editing" : "")
      }
    >
      <div className="view" onDoubleClick={handleDoubleClick}>
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={handleComplete}
        />
        <label>{content}</label>
        <button onClick={handleDelete} className="destroy"></button>
      </div>
      <input
        onBlur={handleBlur}
        className="edit"
        value={editingInput}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
}

function Main({ todoList, deleteTodo, completeTodo, changeTodo }) {
  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={todoList.every((todo) => todo.completed)}
      />
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            changeTodo={changeTodo}
          />
        ))}
      </ul>
    </section>
  );
}
export default Main;
