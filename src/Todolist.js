import React from "react";

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
        <TodoItem content="춤 추기" completed={true} />
        <TodoItem content="리액트 공부" completed={false} />
      </ul>
    </section>
  );
}
export default Main;
