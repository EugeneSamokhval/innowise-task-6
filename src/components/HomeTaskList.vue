<script>
import { doc, getDoc, setDoc } from 'firebase/firestore'
import TaskConstructorPopUp from './TaskConstructorPopUp.vue'
import { db } from '@/main'

export default {
  props: ['selectedDay'],
  components: { TaskConstructorPopUp },
  inject: ['user'],
  methods: {
    async changeState(taskId) {
      const taskIndex = this.selectedDay.tasks.findIndex((item) => item._id === taskId)
      this.$emit('task-status-change', taskIndex)
      const userLink = doc(db, 'users', this.user)
      const updatedArray = (await getDoc(userLink)).data()
      console.log(updatedArray)
      updatedArray.tasks[taskIndex].completed = !updatedArray.tasks[taskIndex].completed
      console.log('Updated array:', updatedArray)
      await setDoc(userLink, updatedArray)
    },
    addNewTaskPopupOpen() {
      this.$refs.popup.openPopup()
    },
    async sendIncompleteTasksForward() {
      if (this.selectedDay.outdated !== 1) {
        const currentUserDoc = getDoc(doc(db, 'users', this.user))
        let currentUserData = (await currentUserDoc).data()
        const listOfIndexes = []
        const incompleteTasks = this.selectedDay.tasks.filter((task) => !task.completed)
        for (let task of incompleteTasks) {
          let index = currentUserData.tasks.findIndex((ptask) => ptask._id === task._id)
          listOfIndexes.push(task)
          currentUserData.tasks[index].day += 86400000
        }
        await setDoc(doc(db, 'users', this.user), currentUserData)
        this.$emit('send-tasks-forward')
      }
    },
    async addNewTask(title) {
      try {
        const UniqueId = 'task_' + Date.now()
        console.log(this.selectedDay)
        const task = {
          _id: UniqueId,
          title: title,
          day: this.selectedDay.date,
          content: '',
          completed: false,
        }
        this.$emit('add-task', task)
        console.log('Task:', task, '\nUser:', this.user)
        const userReference = doc(db, 'users', this.user)
        const userTasks = (await getDoc(userReference)).data()
        console.log(userTasks)
        userTasks['tasks'].push(task)
        await setDoc(userReference, userTasks)
      } catch (e) {
        console.log('Error during firebase update:', e)
      }
    },
  },
  computed: {
    tasksCount() {
      return this.selectedDay ? this.selectedDay.tasks.length : 0
    },
    chosenDayString() {
      console.log('Day of the month processing', this.selectedDay)
      const monthsMap = new Map([
        [0, 'January'],
        [1, 'February'],
        [2, 'March'],
        [3, 'April'],
        [4, 'May'],
        [5, 'June'],
        [6, 'July'],
        [7, 'August'],
        [8, 'September'],
        [9, 'October'],
        [10, 'November'],
        [11, 'December'],
      ])
      console.log(monthsMap)
      if (this.selectedDay) {
        const result = monthsMap.get(this.selectedDay.month) + ' ' + this.selectedDay.day
        return result
      } else return ''
    },
  },
}
</script>
<template>
  <div id="task-list-layout">
    <div id="tasks-title">
      <h2 id="tasks-count">{{ tasksCount }} tasks this day</h2>
      <h2 id="tasks-date">
        {{ chosenDayString }}
      </h2>
    </div>
    <ul id="tasks-list" :selectedDay>
      <li :selectedDay class="task-list-item" v-for="task in selectedDay.tasks" :key="task.id">
        <span :ref="task._id" @click="changeState(task._id)" class="custom-checkbox">
          <img v-show="task.completed" src="../assets/check-bold.svg" />
        </span>
        <a
          @click="$router.push({ path: '/taskeditor', query: { id: task._id, user_id: user } })"
          class="list-item-label"
          :for="task.title"
          >{{ task.title }}</a
        >
      </li>
    </ul>
    <div id="task-list-buttons-container">
      <button
        class="flat-home-button"
        id="transfer-tasks-button"
        @click="sendIncompleteTasksForward"
      >
        <img src="../assets/arrow-right-thin.svg" />
      </button>
      <button @click="addNewTaskPopupOpen" class="flat-home-button" id="add-task-button">
        <img src="../assets/plus.svg" />
      </button>
    </div>
  </div>
  <TaskConstructorPopUp @add-new-task="addNewTask" ref="popup"> </TaskConstructorPopUp>
</template>
<style lang="css" scoped>
.custom-checkbox {
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 5px;
  border: 5px solid #903434;
  position: relative;
  background-color: transparent;
}
.list-item-label {
  color: #651e1e;
  font-size: 24px;
  font-weight: bold;
}
.flat-home-button {
  width: 100px;
  height: 100px;
  border-radius: 35px;
  border-width: 0px;
  cursor: pointer;
}
.task-list-item::marker {
  content: '';
}
.task-list-item {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 75px 1fr;
  margin: 10px;
}
.list-item-checkbox {
  display: none;
}
#task-list-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
#add-task-button {
  background-color: #f65151;
  margin: 5px;
  margin-left: auto;
}
#transfer-tasks-button {
  background-color: #f9af77;
  margin: 5px;
}
#task-list-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 52px 1fr 100px;
  width: 100vw;
}
#tasks-list {
  height: calc(100vh - 355px);
  overflow-x: hidden;
  overflow-y: auto;
}
#tasks-title {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-weight: bold;
  font-size: 30px;
}
#tasks-count {
  text-align: start;
  margin: 0px;
  margin-left: 30px;
  color: #f65151;
}

#tasks-date {
  text-align: end;
  margin: 3px;
  margin-right: 26px;
  color: #903434;
}
</style>
