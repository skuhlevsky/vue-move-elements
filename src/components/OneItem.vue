<template>
  <li v-if="!todo.isDeleted" :class="{'done': todo.isDone}" class="todo__item">
    <div class="checkbox">
      <div class="todo__item--name-area">
        <label v-if="isSelectable" @click="changeDoneStatus()">
          <span :class="{'done': todo.isDone}">
            <strong>{{ index + 1 }}.</strong>
            {{ todo.name }}
          </span>
        </label>
        <label v-else>
          <span>
            <strong>{{ index + 1 }}.</strong>
            {{ todo.name }}
          </span>
        </label>
        <button v-if="isSelectable" @click="edit = true" class="bnt__edit"></button>
        <button v-if="isSelectable" @click="deleteTodoElement(todo.id)" class="bnt__delete"></button>
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    isMove: {
      type: Boolean,
      required: true
    },
    isSelectable: {
      type: Boolean,
      required: true
    },
    noteId: Number,
    index: Number
  },
  data() {
    return {
      todoSaved: {},
      // Copy of the previous state of the object
      edit: false
    };
  },
  computed: {
    count() {
      // Checking for todo element changes
      return this.undoCount();
    }
  },
  watch: {
    count: {
      immediate: true,
      handler() {
        this.saveTodo();
      }
    }
  },
  methods: {
    ...mapGetters(["undoCount"]),
    ...mapMutations(["addActions", "deleteTodo"]),
    changeDoneStatus() {
      this.todo.isDone = !this.todo.isDone;
      this.submit();
    },
    deleteTodoElement() {
      this.deleteTodo({ id: this.noteId, todoObj: this.todo });
      this.submit();
    },
    saveTodo() {
      this.todoSaved = { ...this.todo };
    },
    submit() {
      this.addActions({
        action: "todo",
        undoObj: { ...this.todoSaved },
        redoObj: { ...this.todo }
      });
      this.saveTodo();
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  mounted() {
    this.saveTodo();
  }
};
</script>

<style scoped>
.todo__item {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.2rem;
  transition: color 0.5s;
  text-align: left;
}

input {
  margin-right: 1rem;
}

.done {
  color: #bbbbbb;
  text-decoration: line-through;
}

/* Delete button start here */
.todo__item .checkbox .bnt__delete {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  border: 0;
  background: none;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  cursor: pointer;
  transition: color 0.2s ease-out;
}

.todo__item .bnt__delete:hover {
  color: #af5b5e;
}

.todo__item .bnt__delete:after {
  content: "×";
}

.todo__item:hover .bnt__delete {
  display: block;
}
/* Delete button end here */

.todo__item .bnt__edit {
  display: none;
  position: absolute;
  top: 0;
  right: 30px;
  bottom: 0;
  border: 0;
  background: none;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: auto 0;
  font-size: 22px;
  opacity: 0.5;
  color: #5f9ea0;
  cursor: pointer;
  transition: color 0.2s ease-out;
}

.todo__item .bnt__edit:after {
  content: "✎";
}

.todo__item .bnt__edit:hover {
  opacity: 1;
}

.todo__item:hover .bnt__edit {
  display: block;
}
</style>