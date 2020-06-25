<template>
  <div id="app">
    <h1 class="app-name">
      <router-link to="/" class="link__home">Move elements</router-link>
    </h1>

    <nav>
      <router-link to="/history/">[History]</router-link>
      <router-link to="/history/added/">[Added]</router-link>
      <router-link to="/history/moved/">[Moved]</router-link>
    </nav>

    <router-view />
  </div>
</template>