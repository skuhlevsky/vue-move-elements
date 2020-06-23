<template>
  <div v-if="allNotes.length">
    <input
      class="field__search"
      autofocus
      autocomplete="off"
      placeholder="Search..."
      v-model="search"
    />

    <div class="note-area">
      <div class="note-title">{{ allNotes[0].title }}</div>
      <div class="wrapper">
        <div class="row">
          <div class="column">
            <div class="first-column">
              <Elements
                v-if="filteredListNames.length"
                :elementsArray="filteredListNames"
                :isMove="false"
              />
              <p v-else>Not elements!</p>
            </div>
          </div>
          <div class="column">
            <div class="second-column">
              <Elements
                v-if="filteredListNames.length"
                :elementsArray="filteredListNames"
                :isMove="true"
              />
              <p v-else>Not elements!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Elements from '@/components/Elements';
export default {
  data: () => ({
    search: '',
    searchName: '',
    minSearchStringSize: 0, // off
  }),
  components: {
    Elements,
  },
  filters: {
    resultView(name, searchStr) {
      if (!name) return `${searchStr}`;
      return `${name}`;
    },
  },
  computed: {
    ...mapGetters(['allNotes', 'notesCount']),
    filteredListNames() {
      if (this.search.length < this.minSearchStringSize) return null;

      let searchResult = this.allNotes[0].todos.filter((user) => {
        return user.name.toLowerCase().includes(this.search);
      });

      if (searchResult.length > 0) {
        // At least one character is needed for sorting
        const count = (str, search) => {
          return (str.match(new RegExp(search, 'g')) || []).length;
        };

        searchResult.sort(
          (a, b) => count(b.name, this.search) - count(a.name, this.search)
        );
      }

      return searchResult;
    },
  },
  methods: {
    ...mapActions(['fetchNotes']),
    searchNow(value) {
      this.searchName = value.toLowerCase().trim();
      this.searchSurname = '';
      if (this.hasWhiteSpace(value)) {
        let query = value.split(' ');
        if (query[1]) {
          this.searchName = query[0];
        }
      }
    },
  },

  mounted() {
    // Getting elements if they are not in the LocalStorage
    if (!this.notesCount) {
      this.fetchNotes('All elements');
    }
  },
};
</script>
