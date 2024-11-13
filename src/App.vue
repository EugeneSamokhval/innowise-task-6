<script>
import { RouterView } from 'vue-router'
export default {
  components: { RouterView },
  methods: {
    isNotSignInRoute() {
      console.log(this.$route.name)
      if (['Login page', 'Registration page'].includes(this.$route.name)) {
        return false
      } else return true
    },
  },
}
</script>

<template>
  <header>
    <h1 id="page-title">{{ $route.name }}</h1>
    <img
      id="notification-bell"
      v-if="isNotSignInRoute()"
      src="./assets/bell.svg"
      width="48px"
      height="48px"
    />
    <img
      id="dropdown-menu"
      v-if="isNotSignInRoute()"
      src="./assets/menu.svg"
      height="48px"
      width="48px"
    />
  </header>
  <RouterView />
</template>

<style scoped>
header {
  background-color: #fff2e3;
  height: 80px;
  display: grid;
  grid-template-columns: 1fr 48px 117px;
  align-items: center;
  justify-content: center;
}
#page-title {
  color: #903434;
  font-size: 36px;
  margin: 0px;
  text-align: center;
}
#notification-bell {
  float: right;
}
#dropdown-menu {
  margin-right: 36px;
  margin-left: 33px;
  float: right;
}
@media (max-width: 762px) {
  header {
    max-height: 80px;
  }
}
</style>
