<template>
  <div id="app">
    <h1 class="app-name">
      <router-link
        to="/"
        @click.native.prevent="handleOpenModal"
        class="link__home"
      >
        Move elements
      </router-link>
    </h1>
    <nav>
      <router-link to="/history/">[история]</router-link>
      <router-link to="/history/added/">[история добавлений]</router-link>
      <router-link to="/history/moved/">[история удалений]</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    handleOpenModal: function(e) {
      e.preventDefault();
      this.$router.push('/', () => {});
    },
  },
};
</script>
