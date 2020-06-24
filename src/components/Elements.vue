<template>
  <ul>
    <OneItem
      v-for="(element, index) of elementsArray"
      :element="element"
      :index="index"
      :key="element.id"
      :isMove="isMove"
    />
  </ul>
</template>

<script>
import OneItem from '@/components/OneItem';
export default {
  props: ['elementsArray', 'isMove'],
  components: {
    OneItem,
  },
  computed: {
    // check deleted elements
    elements() {
      return this.elements.filter((t) => !t.isDeleted);
    },
  },
};
</script>
