import React from "react";

function Todocheck({ count, clearCompleted }) {
  function handleComplete(e) {
    clearCompleted();
  }
  return (
    <footer className="footer">
      <span className="todo-count">
        {count === 0 ? null : (
          <>
            <strong>{count}</strong>
            <span> {count === 1 ? "item" : "items"}</span>
            <span> left</span>
          </>
        )}
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>
        <span> </span>
        <li>
          <a href="#/active" className="">
            Active
          </a>
        </li>
        <span> </span>
        <li>
          <a href="#/completed" className="">
            Completed
          </a>
        </li>
      </ul>
      <button onClick={handleComplete} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
export default Todocheck;
