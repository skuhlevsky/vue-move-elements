<template>
  <ul>
    <template v-for="item of fullHistory">
      <li
        v-if="!deepHistory || (deepHistory && item.isMoved === added)"
        :key="item.time"
        :class="[item.isMoved ? 'blue' : 'red', 'history__item']"
      >
        <span class="history__item--id">({{ item.obj.id }}) -- </span>
        <span>{{ item.obj.name }} -- {{ item.time | formatDate }}</span>
        <span v-if="item.isMoved"> -- Added</span>
        <span v-else> -- Moved</span>
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
  props: ['deepHistory', 'added'],
  computed: {
    ...mapGetters(['fullHistory']),
  },
  filters: {
    formatDate(time) {
      return moment(time).format('MM-DD-YYYY hh:mm');
    },
  },
};
</script>

<style scoped>
.history__item {
  margin-bottom: 1em;
  font-size: 0.85em;
}
.history__item--id {
  color: grey;
  font-size: 0.75em;
}
.blue {
  color: blue;
}
.red {
  color: maroon;
}
</style>
