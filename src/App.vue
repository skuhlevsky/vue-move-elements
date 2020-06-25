<template>
  <div id="app">
    <h1 class="app-name">
      <router-link to="/" class="link__home">Move elements</router-link>
    </h1>

    <nav>
      <router-link to="/history/">[история]</router-link>
      <router-link to="/history/added/">[история добавлений]</router-link>
      <router-link to="/history/moved/">[история удалений]</router-link>
    </nav>

    <router-view />
  </div>
</template>