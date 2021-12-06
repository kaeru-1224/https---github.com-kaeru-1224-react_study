import React, { useState } from "react";
import Header from "./Header";
import Main from "./Todolist";
import Todocheck from "./Todocheck";
import { produce } from "immer";
import "./App.css";

function App() {
  const initialState = [
    {
      id: crypto.randomUUID(),
      content: "춤 추기",
      completed: true,
      active: true,
    },
    {
      id: crypto.randomUUID(),
      content: "리액트 공부",
      completed: false,
      active: false,
    },
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
  //타겟아이디로 수정할 사항 확인하고-> 맞으면 수정하도록 진행(?그런데 수정하려면 라벨을 어케 만들어줘야함?)
  function changeTodo(targetId, newContent) {
    setTodoList(
      produce((old) => {
        const target = old.find((todo) => todo.id === targetId);
        target.content = newContent;
      })
    );
  }

  const count = todoList.filter((todo) => todo.completed === false).length;

  return (
    <section className="todoapp">
      <div>
        <Header addTodo={addTodo} />
        <Main
          todoList={todoList}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          changeTodo={changeTodo}
        />
        <Todocheck count={count} clearCompleted={clearCompleted} />
      </div>
    </section>
  );
}

export default App;
