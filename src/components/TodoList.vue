<template>
  <div>
    <ul>
      <OneItem
        v-for="(todo, index) of todoElements"
        :todo="todo"
        :index="index"
        :key="todo.id"
        :isMove="isMove"
        :isSelectable="isSelectable"
      />
    </ul>
  </div>
</template>

<script>
import OneItem from "@/components/OneItem";
export default {
  props: ["todos", "isMove", "isSelectable"],
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