<template>
  <div>
    <div v-for="note of allNotes" :key="note.id" class="note-area">
      <div class="note-title">{{ note.title }}</div>

      <div class="wrapper">
        <div class="row">
          <div class="column">
            <div class="first-column">
              <TodoList
                v-if="note.todos.length"
                :todos="note.todos"
                :isMove="false"
                :isSelectable="false"
              />
              <p v-else>Not elements!</p>
            </div>
          </div>
          <div class="column">
            <div class="second-column">
              <TodoList
                v-if="note.todos.length"
                :todos="note.todos"
                :isMove="true"
                :isSelectable="true"
              />
              <p v-else>Not elements!</p>
            </div>
          </div>
        </div>
      </div>
      <div>[история] [история добавлений] [история удалений]</div>
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

<style scoped>
.wrapper {
  margin: 15px;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
}
</style>