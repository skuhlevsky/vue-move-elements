<template>
  <div>
    <div v-for="note of allNotes" :key="note.id" class="note-area">
      <div class="note-title">{{ note.title }}</div>

      <TodoList
        v-if="note.todos.length"
        :todos="note.todos"
        :removable="false"
        :isSelectable="false"
      />
      <p v-else>Not elements!</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TodoList from "@/components/TodoList";
export default {
  computed: mapGetters(["allNotes", "notesCount"]),
  methods: {
    ...mapActions(["fetchNotes"])
  },
  components: {
    TodoList
  },
  mounted() {
    if (!this.notesCount) {
      this.fetchNotes("First elements");
    }
  }
};
</script>