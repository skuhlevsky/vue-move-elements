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
      elementsaved: {},
      // Copy of the previous state of the object
      edit: false,
    };
  },
  computed: {
    count() {
      // Checking for todo element changes
      return this.historyCount();
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
    ...mapGetters(['historyCount']),
    ...mapMutations(['addActions']),
    changeMoveStatus() {
      this.todo.isMoved = !this.todo.isMoved;
      this.submit();
    },
    saveTodo() {
      this.elementsaved = { ...this.todo };
    },
    submit() {
      this.addActions({
        historyObj: { ...this.elementsaved },
        isMoved: this.todo.isMoved,
      });
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
