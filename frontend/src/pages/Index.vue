<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todoState.todos"
      :count="todoState.todoClickedCount"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import ExampleComponent from "components/CompositionComponent.vue";
import { defineComponent } from "vue";
import { useTodo } from "src/module/useTodo";

export default defineComponent({
  name: "PageIndex",
  components: { ExampleComponent },
  setup() {
    const {state: todoState} = useTodo();

    return { todoState };
  },
});
</script>
