<script>
export default {
  data() {
    return { taskName: '', visible: false }
  },
  methods: {
    initTaskCreation() {
      this.$emit('add-new-task', this.taskName)
      console.log('Task name:', this.taskName)
      this.closePopup()
    },
    openPopup() {
      this.visible = true
    },
    closePopup() {
      this.visible = false
    },
  },
}
</script>
<template>
  <div class="popup-message-overlay" v-if="visible">
    <div class="popup-message" id="task-input-pop-up">
      <label id="task-creation-label" for="task-name">Input task title</label>
      <input
        name="task-name"
        class="registration-input"
        id="task-name-input"
        v-model="taskName"
        type="text"
      />
      <button
        @click="initTaskCreation()"
        class="task-creation-pop-up-button"
        id="submit-task-button"
      >
        Save
      </button>
      <button
        @click="closePopup"
        class="task-creation-pop-up-button"
        id="cancel-task-submition-button"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<style scoped lang="css">
#task-name-input {
  border-radius: 15px;
  width: 400px;
  height: 40px;
  grid-column: span 2;
}
#task-creation-label {
  width: 400px;
  grid-column: span 2;
}
#task-input-pop-up {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  text-align: center;
}
.task-creation-pop-up-button {
  width: 100px;
  height: 45px;
  border-radius: 15px;
  font-weight: bold;
  color: #903434;
  cursor: pointer;
  border-width: 0px;
}
#submit-task-button {
  background-color: #d4fdab;
}
#cancel-task-submition-button {
  background-color: #f65151;
}
</style>
