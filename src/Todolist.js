import React, { useState } from "react";

function TodoItem({ content, completed }) {
  return (
    <li className={completed ? "completed" : null}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} />
        <label>{content}</label>
        <button className="destroy"></button>
      </div>
      <input className="edit" value={content} />
    </li>
  );
}

function Main() {
  const [todoList, setTodoList] = useState([
    { content: "춤 추기", completed: true },
    { content: "리액트 공부", completed: false },
  ]);

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked=""
      />
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list">
        {todoList.map((todo) => (
          <TodoItem {...todo} />
        ))}
      </ul>
    </section>
  );
}
export default Main;
