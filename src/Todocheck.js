import React from "react";
import { useDispatch } from "react-redux";
import { clearCompleted } from "./todoListSlice";

function Todocheck({ count, filter, setFilter }) {
  const dispatch = useDispatch();
  function handleComplete(e) {
    dispatch(clearCompleted());
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {count === 0 ? null : (
          <>
            <strong>{count}</strong>
            <span> {count === 1 ? "item" : "items"}</span>
            <span>{filter === "completed" ? " end" : " left"} </span>
          </>
        )}
      </span>
      <ul className="filters">
        {["all", "active", "completed"].map((name) => (
          <li key={name}>
            <a
              href={"#/" + name}
              className={name === filter ? "selected" : " "}
              onClick={(e) => setFilter(name)}
            >
              {" "}
              {name}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={handleComplete} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}
export default Todocheck;
