import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Todolist";
import Todocheck from "./Todocheck";
import { useSelector, useDispatch } from "react-redux";
import { loadSaved } from "./todoListSlice";
import "./App.css";

// 커스텀 훅
// jotai
// redux-toolkit

function App() {
  const todoList = useSelector((state) => state.todoList.value);

  const dispatch = useDispatch();

  // 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("To-Do", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const getTodo = localStorage.getItem("To-do");
    if (JSON.parse(getTodo)) {
      dispatch(loadSaved({ saved: JSON.parse(getTodo) }));
    }
  }, [dispatch]);

  //남은 개수 확인
  const count = todoList.filter((todo) => todo.completed === false).length;
  //전체-완료- 미완료 필터링
  //기본 디폴트값 만들어주기

  const [filter, setFilter] = useState("all");
  function getFiltered(filter) {
    if (filter === "active") {
      return todoList.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      return todoList.filter((todo) => todo.completed);
    }
    return todoList;
  }
  //변경된 투두 리스트를 메인에 보내주기위한 용도
  const filteredTodoList = getFiltered(filter);

  return (
    <section className="todoapp">
      <div>
        <Header />
        <Main todoList={filteredTodoList} />
        <Todocheck count={count} filter={filter} setFilter={setFilter} />
      </div>
    </section>
  );
}

export default App;
