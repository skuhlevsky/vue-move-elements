<template>
  <li v-if="element.isMoved === isMove" class="element__item">
    <div class="checkbox">
      <label @click="changeMoveStatus()">
        <strong>{{ index + 1 }}.</strong>
        {{ element.name }}
        <span v-if="!element.isMoved">[+]</span>
        <span v-else>[-]</span>
      </label>
    </div>
  </li>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    element: {
      type: Object,
      required: true
    },
    isMove: {
      type: Boolean,
      required: true
    },
    noteId: Number,
    index: Number
  },
  data() {
    return {
      elementSaved: {},
      edit: false
    };
  },
  computed: {
    count() {
      // Checking for element changes
      return this.historyCount();
    }
  },
  watch: {
    count: {
      immediate: true,
      handler() {
        this.saveElement();
      }
    }
  },
  methods: {
    ...mapGetters(["historyCount"]),
    ...mapMutations(["addActions"]),
    changeMoveStatus() {
      this.element.isMoved = !this.element.isMoved;
      this.submit();
    },
    saveElement() {
      this.elementSaved = { ...this.element };
    },
    submit() {
      this.addActions({
        historyObj: { ...this.elementSaved },
        isMoved: this.element.isMoved
      });
      this.saveElement();
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
    this.saveElement();
  }
};
</script>
