<template>
  <div>
    <ul>
      <OneItem
        v-for="(todo, index) of todoElements"
        :todo="todo"
        :index="index"
        :key="todo.id"
        :removable="removable"
        :isSelectable="isSelectable"
      />
    </ul>
  </div>
</template>

<script>
import OneItem from "@/components/OneItem";
export default {
  props: ["todos", "removable", "isSelectable"],
  components: {
    OneItem
  },
  computed: {
    todoElements() {
      return this.todos.filter(t => !t.isDeleted);
    }
  }
};
</script>