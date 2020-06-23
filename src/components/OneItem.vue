<template>
  <li v-if="todo.isMoved === isMove" class="todo__item">
    <div class="checkbox">
      <label @click="changeMoveStatus()">
        <strong>{{ index + 1 }}.</strong>
        {{ todo.name }}
        <span v-if="!todo.isMoved">[+]</span>
        <span v-else>[-]</span>
      </label>
    </div>
  </li>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    isMove: {
      type: Boolean,
      required: true,
    },
    noteId: Number,
    index: Number,
  },
  data() {
    return {
      todoSaved: {},
      // Copy of the previous state of the object
      edit: false,
    };
  },
  computed: {
    count() {
      // Checking for todo element changes
      return this.undoCount();
    },
  },
  watch: {
    count: {
      immediate: true,
      handler() {
        this.saveTodo();
      },
    },
  },
  methods: {
    ...mapGetters(['undoCount']),
    ...mapMutations(['addActions']),
    changeMoveStatus() {
      this.todo.isMoved = !this.todo.isMoved;
      this.submit();
    },
    saveTodo() {
      this.todoSaved = { ...this.todo };
    },
    submit() {
      this.addActions({ ...this.todoSaved });
      this.saveTodo();
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  mounted() {
    this.saveTodo();
  },
};
</script>
