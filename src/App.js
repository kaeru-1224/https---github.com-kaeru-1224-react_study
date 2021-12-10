import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Todolist";
import Todocheck from "./Todocheck";
import { produce } from "immer";
import "./App.css";
import { loadPartialConfig } from "@babel/core";

function App() {
  const initialState = [];
  const [todoList, setTodoList] = useState(initialState);
  // 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("To-Do", JSON.stringify(todoList));
  }, [todoList]);
  useEffect(() => {
    const getTodo = localStorage.getItem("To-do");
    if (JSON.parse(getTodo)) {
      setTodoList(JSON.parse(getTodo));
    }
  }, []);

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

  function completeTodo(targetId) {
    setTodoList(
      produce((old) => {
        const target = old.find((todo) => todo.id === targetId);

        target.completed = !target.completed;
      })
    );
  }

  function clearCompleted() {
    setTodoList(
      produce((old) => {
        const target = old.filter((todo) => todo.completed === true);
        target.map((todo) => deleteTodo(todo.id));
      })
    );
  }
  //수정

  function changeTodo(targetId, newContent) {
    setTodoList(
      produce((old) => {
        const target = old.find((todo) => todo.id === targetId);
        target.content = newContent;
      })
    );
  }
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
        <Header addTodo={addTodo} />
        <Main
          todoList={(todoList, filteredTodoList)}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          changeTodo={changeTodo}
        />
        <Todocheck
          count={count}
          clearCompleted={clearCompleted}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </section>
  );
}

export default App;
