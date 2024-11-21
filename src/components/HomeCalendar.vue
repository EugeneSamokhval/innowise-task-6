<script>
export default {
  props: ['calendarEntries'],
  async setup() {},
  methods: {
    getWeekStringFromNumber(weekNum) {
      switch (weekNum) {
        case 0:
          return 'Mon'
        case 1:
          return 'Tue'
        case 2:
          return 'Wed'
        case 3:
          return 'Thu'
        case 4:
          return 'Fri'
        case 5:
          return 'Sat'
        case 6:
          return 'Sun'
        default:
          return 'Incorrect index'
      }
    },
    anyCompletedTasks(entry) {
      for (let task of entry.tasks) {
        if (task.completed) return true
      }
      return false
    },
  },
  mounted() {
    const calendarElementsContainer = document.getElementById('calendar-days-container')
    calendarElementsContainer.scrollTo(3905, 0)
  },
}
</script>
<template>
  <div :calendarEntries id="calendar-component">
    <img id="calendar-scroll-left" src="../assets/menu-left.svg" width="48" height="48" />
    <div id="calendar-days-container">
      <template v-for="entry in calendarEntries" :key="entry.id">
        <div
          class="calendar-entry"
          :class="{ outdated: entry.outdated === 1, current: entry.outdated === -1 }"
        >
          <span class="calendar-entry-day" v-text="entry.day"></span>
          <span
            class="calendar-entry-weekday"
            v-text="getWeekStringFromNumber(entry.weekday)"
          ></span>
          <div class="calendar-task-completion-status-box">
            <svg
              v-show="entry.tasks.length && anyCompletedTasks(entry)"
              width="10"
              height="10"
              class="activity-status-1"
            >
              <circle r="5" cx="5" cy="5" fill="black"></circle>
            </svg>
            <svg v-show="anyCompletedTasks(entry)" width="10" height="10" class="activity-status-2">
              <circle r="5" cx="5" cy="5" fill="black"></circle>
            </svg>
          </div>
        </div>
      </template>
    </div>
    <img id="calendar-scroll-right" src="../assets/menu-right.svg" width="48" height="48" />
  </div>
</template>
<style scoped>
.calendar-entry {
  width: 80px;
  height: 80px;
  color: #903434;
  font-weight: bold;
  font-size: 24px;
  font-family: 'Jaldi';
  border-radius: 15px;
  background-color: #ffebd4;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
.calendar-entry-day {
  width: 80px;
  height: 36px;
  text-align: center;
  align-content: end;
}
.calendar-entry-weekday {
  width: 80px;
  height: 21px;
  text-align: center;
  align-content: end;
}
.calendar-task-completion-status-box {
  height: 23px;
  width: 30px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}
.outdated {
  background-color: #1e1e1e;
}
.current {
  background-color: #ffc79c;
}
#calendar-component {
  background-color: #fce0c0;
  width: 100vw;
  height: 90px;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  grid-template-rows: 1fr;
  align-items: center;
}
#calendar-days-container {
  overflow-x: visible;
  width: calc(100vw - 96px);
  height: inherit;
  display: flex;
  flex-flow: row;
  overflow-x: auto;
  gap: 5px;
  align-items: center;
}
</style>
