import { reactive } from "vue";

export interface Todo {
  name: string;
}

export interface TodoState {
  todos: Todo[];
  todoClickedCount: number;
}

const state = reactive<TodoState>({
  todos: [
    {
      name: "todo 1",
    },
    { name: "todo 2" },
  ],
  todoClickedCount: 0,
});

export const useTodo = () => {
  const clickTodo = () => {
    state.todoClickedCount++;
  };
  return { state, clickTodo };
};
