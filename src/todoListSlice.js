// https://redux-toolkit.js.org/tutorials/quick-start
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    loadSaved: (state, action) => {
      return { value: action.payload.saved };
    },
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        completed: false,
      };
      state.value.push(newTodo);
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter(
        (todo) => todo.id !== action.payload.targetId
      );
    },
    completeTodo: (state, action) => {
      const target = state.value.find(
        (todo) => todo.id === action.payload.targetId
      );

      target.completed = !target.completed;
    },
    clearCompleted: (state, action) => {
      return { value: state.value.filter((todo) => todo.completed === false) };
    },
    changeTodo: (state, action) => {
      const target = state.value.find(
        (todo) => todo.id === action.payload.targetId
      );
      target.content = action.payload.newContent;
    },
  },
});

// message, action
// action creator
export const {
  loadSaved,
  addTodo,
  deleteTodo,
  completeTodo,
  clearCompleted,
  changeTodo,
} = todoListSlice.actions;

export default todoListSlice.reducer;

/*
[1, 2, 3, 4].reduce(counterSlice.reducer,  { value: 0})

state            action
{ value: 0 }  {type:"counter/increment"}  => { value: 1 }
{ value: 1 }  {type:"counter/increment"}  => { value: 2 }
{ value: 2 }  {type:"counter/decrement"}  => { value: 1 }
{ value: 1 }  {type:"counter/increment"}  => { value: 2 }
{ value: 2 }  {type:"counter/incrementByAmount", payload: { amount: 3} }  => { value: 5 }

function reducer(state, action){
    if(action.type === 'counter/decrement'){
        return { value: state.value - 1 }
    }
    if(action.type === 'counter/increment'){
        return { value: state.value + 1 }
    }
}
*/
