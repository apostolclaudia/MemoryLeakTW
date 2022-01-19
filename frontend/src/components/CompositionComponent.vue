<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.name" @click="clickTodo">
        {{ todo.name }}
      </li>
    </ul>
    <p>Count: {{ todos.length }}</p>
    <p>Active: {{ active ? "yes" : "no" }}</p>
    <p>Clicks on todos: {{ count }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useTodo, Todo } from "src/module/useTodo";

export default defineComponent({
  name: "CompositionComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
    active: {
      type: Boolean,
    },
    count: {
      type: Number,
    }
  },
  setup(props) {
    const { clickTodo } = useTodo();
    return {
      clickTodo,
    };
  },
});
</script>
