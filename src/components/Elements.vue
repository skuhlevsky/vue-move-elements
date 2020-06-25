<template>
  <div class="column">
    <ul>
      <One
        v-for="(element, index) of elementsArray"
        :element="element"
        :elementIndex="index"
        :key="element.id"
        :isMove="isMove"
      />
    </ul>
  </div>
</template>

<script>
import One from "@/components/One";
export default {
  props: {
    elementsArray: {
      type: Array,
      required: true
    },
    isMove: {
      type: Boolean,
      required: true
    }
  },
  components: {
    One
  },
  computed: {
    // check deleted elements
    elements() {
      return this.elements.filter(t => !t.isDeleted);
    }
  }
};
</script>
