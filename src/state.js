import { atom, useAtom } from "jotai";
import { produce } from "immer";

const todoListAtom = atom([]);

function useTodoListAtom() {
  const [todoList, setTodoList] = useAtom(todoListAtom);
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
    setTodoList((old) => old.filter((todo) => todo.completed === true));
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

  return {
    todoList,
    setTodoList,
    addTodo,
    deleteTodo,
    completeTodo,
    clearCompleted,
    changeTodo,
  };
}

export default useTodoListAtom;
