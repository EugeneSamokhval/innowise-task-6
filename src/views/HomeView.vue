<script>
import HomeCalendar from '@/components/HomeCalendar.vue'
import { generateMonthData } from '@/utils/constructCalendar.js'
import { getAuth } from 'firebase/auth'
import HomeTaskList from '@/components/HomeTaskList.vue'
import userDataFetching from '@/utils/dataFetching.js'
import { addMonth } from '@/utils/constructCalendar'

async function getUserData(userId) {
  if (!userId) {
    console.error('No user is logged in.')
    return null
  }

  try {
    const userDataDoc = await userDataFetching(userId)
    return userDataDoc
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

export default {
  components: { HomeCalendar, HomeTaskList },
  data() {
    return {
      calendarData: [],
      userData: [],
      selectedDay: { tasks: [] },
      userId: '',
    }
  },

  provide() {
    const id = getAuth().currentUser?.uid
    if (id) return { user: getAuth().currentUser?.uid }
  },

  methods: {
    setSelectedDay(element) {
      this.selectedDay = element.elementData
    },

    handleTaskStatusChange(index) {
      this.selectedDay.tasks[index].completed = !this.selectedDay.tasks[index].completed
    },

    handleSendTasksForward() {
      const tasksToSend = this.selectedDay.tasks.filter((task) => !task.completed)
      this.selectedDay.tasks = this.selectedDay.tasks.filter((task) => task.completed)
      let indexOfEntrie = this.calendarData.findIndex((entry) => entry === this.selectedDay)
      if (indexOfEntrie < this.calendarData.length)
        for (let task in tasksToSend) this.calendarData[indexOfEntrie + 1].tasks.push(task)
    },

    async addMonthForward() {
      const newDates = await addMonth(this.calendarData, this.userData)
      this.calendarData = this.calendarData.concat(newDates)
    },
  },

  async mounted() {
    try {
      const userId = getAuth().currentUser?.uid
      const fetchedUserData = await getUserData(userId)
      if (fetchedUserData) {
        this.userData = fetchedUserData
        this.calendarData = await generateMonthData(fetchedUserData)
      } else {
        console.error('Failed to fetch or process user data.')
        this.calendarData = []
      }
    } catch (error) {
      console.error('Error while fetching user data:', error)
      this.calendarData = []
    }
  },
}
</script>

<template>
  <main>
    <Suspense>
      <HomeCalendar
        :calendarData
        v-if="calendarData.length"
        :calendarEntries="calendarData"
        @element-chosen="(item) => setSelectedDay(item)"
        @add-month-forward="addMonthForward"
      >
      </HomeCalendar>
    </Suspense>
    <HomeTaskList
      @add-task="(entry) => selectedDay.tasks.push(entry)"
      @task-status-change="handleTaskStatusChange"
      @send-tasks-forward="handleSendTasksForward"
      :selectedDay
    ></HomeTaskList>
  </main>
</template>

<style>
main {
  height: calc(100vh - 80px);
  width: 100vw;
  overflow-x: hidden;
  background-color: var(--muted-color);
}

header {
  grid-template-columns: 1fr 50px;
}
</style>
