<script>
import { db } from '@/main'
import { doc, setDoc } from 'firebase/firestore'
import { toValue } from 'vue'
import ChoisePopUp from '@/components/ChoisePopUp.vue'
import userDataFetching from '@/utils/dataFetching'

export default {
  components: { ChoisePopUp },
  data() {
    return {
      currentTask: { title: '', content: '', completed: false },
      currentTaskPrevousState: Object.freeze({}),
      editMode: false,
      taskId: '',
      userId: '',
    }
  },

  async mounted() {
    const taskId = this.$route.query.id
    const userId = this.$route.query.user_id
    const userData = await userDataFetching(userId)
    const tasksList = userData.tasks
    const currentTaskLoaded = tasksList.find((task) => task._id === taskId)
    this.currentTask = currentTaskLoaded
    this.userId = userId
    this.taskId = taskId
  },

  methods: {
    async deleteTaskHandler() {
      const taskData = await userDataFetching(this.userId)
      taskData.tasks = taskData.tasks.filter((task) => task._id !== this.taskId)

      await setDoc(doc(db, 'users', this.userId), taskData)
      this.$router.push('/')
    },

    handleEditModeChange() {
      this.editMode = !this.editMode
      if (this.currentTaskPrevousState) this.currentTaskPrevousState = toValue(this.currentTask)
      else this.currentTask = this.currentTaskPrevousState
    },

    async handleSaveChanges() {
      const taskData = await userDataFetching(this.userId)
      const index = taskData.tasks.findIndex((task) => task._id === this.taskId)
      taskData.tasks[index] = toValue(this.currentTask)
      await setDoc(doc(db, 'users', this.userId), taskData)
      this.currentTaskPrevousState = toValue(this.currentTask)
      this.editMode = !this.editMode
    },

    handlePopUpOpennting() {
      this.$refs.popup.openPopup()
    },
  },
}
</script>

<template>
  <main v-if="currentTask" class="edit-page-layout">
    <div v-if="!editMode" class="task-data-container">
      <h2 class="task-title">{{ currentTask.title }}</h2>
      <p class="task-content">{{ currentTask.content }}</p>
    </div>
    <div v-else-if="editMode">
      <input class="task-title edit-mode" type="text" v-model="currentTask.title" />
      <textarea class="task-content edit-mode" v-model="currentTask.content"> </textarea>
    </div>
  </main>
  <footer class="task-edit-footer">
    <img
      width="48"
      height="48"
      alt="return back"
      class="return-button"
      src="../assets/arrow_left.svg"
      @click="$router.push('/')"
    />
    <img
      width="48"
      height="48"
      alt="delete task button"
      class="delete-button"
      src="../assets/trash-can-outline.svg"
      @click="handlePopUpOpennting"
    />
    <img
      v-if="!editMode"
      width="48"
      height="48"
      alt="edit task button"
      class="edit-button"
      src="../assets/pencil-outline.svg"
      @click="handleEditModeChange"
    />
    <div v-else-if="editMode" class="edit-mode-buttons-box">
      <img class="save-changes" @click="handleSaveChanges" src="../assets/check-bold.svg" />
      <img class="cancel-changes" @click="handleEditModeChange" src="../assets/close.svg" />
    </div>
    <div v-if="currentTask" class="current-task-state">
      {{ currentTask.completed ? 'Completed' : 'Incomplete' }}
    </div>
  </footer>
  <ChoisePopUp @accepted="deleteTaskHandler" ref="popup">{{
    'Do you want to delete this task?'
  }}</ChoisePopUp>
</template>

<style lang="css" scoped>
.edit-mode {
  background-color: rgba(0, 0, 0, 0);
  border-style: dashed;
  border-width: 5px;
  border-color: var(--secondary-color);
}

.edit-page-layout {
  background-color: var(--muted-color);
  width: 100vw;
  height: 83vh;
}

.task-edit-footer {
  border-top: 3px solid var(--border-color);
  background-color: var(--background-color);
  display: grid;
  grid-template-columns: 100px 100px 100px 1fr;
  align-items: center;
  justify-items: center;
  height: 80px;
}

.task-content {
  font-size: 24px;
  color: var(--secondary-color);
  font-weight: bold;
  width: 100vw;
  height: 73vh;
}

.task-title {
  margin: 0px;
  color: var(--secondary-color);
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  align-content: center;
  border-bottom: 3px solid var(--border-color);
  width: 100vw;
  height: 90px;
}

.edit-mode-buttons-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.current-task-state {
  border-width: 0px;
  color: var(--primary-color);
  background-color: var(--light-color);
  font-size: 24px;
  font-weight: bold;
  width: 180px;
  height: 50px;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-align: center;
  border-radius: 25px;
  margin-left: auto;
  margin-right: 20px;
}
</style>
