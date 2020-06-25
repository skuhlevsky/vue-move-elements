<template>
  <li v-if="element.isMoved === isMove" class="element__item">
    <label @click="changeMoveStatus()">
      <strong>{{ elementIndex + 1 }}.</strong>
      {{ element.name }}
      <span v-if="!element.isMoved">[+]</span>
      <span v-else>[-]</span>
    </label>
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
    elementIndex: {
      type: Number,
      required: true
    }
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
  mounted() {
    this.saveElement();
  }
};
</script>
