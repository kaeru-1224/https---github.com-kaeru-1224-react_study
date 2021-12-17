import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, completeTodo, changeTodo } from "./todoListSlice";

function TodoItem({ id, content, completed }) {
  const dispatch = useDispatch();

  function handleDelete(e) {
    dispatch(deleteTodo({ targetId: id }));
  }
  function handleComplete(e) {
    dispatch(completeTodo({ targetId: id }));
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
      dispatch(changeTodo({ targetId: id, newContent: editingInput }));
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

function Main({ todoList }) {
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
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  );
}
export default Main;
