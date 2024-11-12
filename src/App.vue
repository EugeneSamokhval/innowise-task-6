<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register">Registration page</RouterLink>
      <RouterLink to="/login">Login page</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  background-color: #fff2e3;
  max-height: 160px;
}
body {
  margin: 0px;
}
@media (max-width: 762px) {
  header {
    max-height: 80px;
  }
}
</style>
