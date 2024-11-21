<script>
export default {
  props: ['currentDay'],
}
</script>
<template>
  <div id="task-list-layout">
    <div id="tasks-title">
      <h2 id="tasks-count"></h2>
      <h2 id="tasks-date"></h2>
    </div>
    <ul id="tasks=list">
      <li></li>
    </ul>
  </div>
</template>
<style lang="css" scoped>
#task-list-layout {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
