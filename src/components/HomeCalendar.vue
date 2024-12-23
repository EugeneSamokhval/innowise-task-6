<script>
export default {
  props: ['calendarEntries'],
  async setup() {},

  data() {
    return { selectedDay: null }
  },

  methods: {
    getWeekStringFromNumber(weekNum) {
      const weekMap = new Map([
        [0, 'Mon'],
        [1, 'Tue'],
        [2, 'Wed'],
        [3, 'Thu'],
        [4, 'Fri'],
        [5, 'Sat'],
        [6, 'Sun'],
      ])

      return weekMap.get(weekNum) || 'Incorrect index'
    },

    anyCompletedTasks(entry) {
      for (let task of entry.tasks) {
        if (task.completed) return true
      }
      return false
    },

    scrollRightFar() {
      const calendarElementsContainer = this.$refs.entriesContainer
      calendarElementsContainer.scrollLeft += 500
      if (calendarElementsContainer.scrollLeft === calendarElementsContainer.scrollLeftMax) {
        this.$emit('add-month-forward')
        calendarElementsContainer.scrollLeft += 500
      }
    },

    scrollLeftFar() {
      const calendarElementsContainer = document.getElementById('calendar-days-container')
      calendarElementsContainer.scrollLeft -= 500
    },

    handleSelection(id, entry) {
      if (this.selectedDay) {
        this.selectedDay.domElement.classList.remove('selected-entry')
      }
      this.selectedDay = { domElement: this.$refs[id][0], elementData: entry }
      this.$refs[id][0].classList.add('selected-entry')
      this.$emit('element-chosen', this.selectedDay)
    },
  },

  async mounted() {
    const calendarElementsContainer = this.$refs.entriesContainer
    calendarElementsContainer.scrollTo(2400, 0)
    const todayElement = document.getElementsByClassName('current')[0]
    const clickEvent = new Event('click')
    todayElement.dispatchEvent(clickEvent)
  },
}
</script>

<template>
  <div :calendarEntries class="calendar-component">
    <img
      class="calendar-scroll-left"
      src="../assets/menu-left.svg"
      width="48"
      height="48"
      @click="scrollLeftFar"
    />
    <div :calendarEntries ref="entriesContainer" class="calendar-days-container">
      <template v-for="entry in calendarEntries" :key="entry.id">
        <div
          :ref="entry.id"
          class="calendar-entry"
          @click="(e) => handleSelection(entry.id, entry)"
          :class="{ outdated: entry.outdated === 1, current: entry.outdated === -1 }"
        >
          <span class="calendar-entry-day" v-text="entry.day"></span>
          <span
            class="calendar-entry-weekday"
            v-text="getWeekStringFromNumber(entry.weekday)"
          ></span>
          <div :entry class="calendar-task-completion-status-box">
            <svg v-show="entry.tasks.length" width="10" height="10" class="activity-status-1">
              <circle r="5" cx="5" cy="5" fill="#651E1E"></circle>
            </svg>
            <svg v-show="anyCompletedTasks(entry)" width="10" height="10" class="activity-status-2">
              <circle r="5" cx="5" cy="5" fill="var(--accent-color)"></circle>
            </svg>
          </div>
        </div>
      </template>
    </div>
    <img
      class="calendar-scroll-right"
      src="../assets/menu-right.svg"
      width="48"
      height="48"
      @click="scrollRightFar"
    />
  </div>
</template>

<style scoped>
.calendar-entry {
  width: 80px;
  height: 80px;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 24px;
  font-family: 'Jaldi';
  border-radius: 15px;
  background-color: var(--muted-color);
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
  background-color: var(--dark-color);
}

.current {
  background-color: var(--info-color);
}

.calendar-component {
  background-color: var(--subtle-color);
  width: 100vw;
  height: 100px;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  grid-template-rows: 1fr;
  align-items: center;
}

.calendar-days-container {
  overflow-x: visible;
  scroll-behavior: smooth;
  width: calc(100vw - 96px);
  height: inherit;
  display: flex;
  flex-flow: row;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-gutter: stable;
  gap: 5px;
  align-items: center;
}

.selected-entry {
  border: 3px solid var(--accent-color);
}
</style>
