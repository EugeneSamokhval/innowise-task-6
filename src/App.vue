<script>
import { RouterView } from 'vue-router'
import MenuDropDown from './components/MenuDropdown.vue'

export default {
  components: { RouterView, MenuDropDown },
  methods: {
    isNotSignInRoute() {
      if (['Login page', 'Registration page'].includes(this.$route.name)) {
        return false
      } else return true
    },
    openMenu() {
      this.$refs.menu.showMenu()
    },
  },
}
</script>

<template>
  <header>
    <h1 id="page-title">{{ $route.name }}</h1>
    <MenuDropDown v-if="isNotSignInRoute()" ref="menu"></MenuDropDown>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  background-color: var(--background-color);
  height: 80px;
  display: grid;
  align-items: center;
  justify-content: center;
}
#page-title {
  color: var(--primary-color);
  font-size: 36px;
  margin: 0px;
  position: absolute;
  left: auto;
  width: 100vw;
  text-align: center;
}
</style>
