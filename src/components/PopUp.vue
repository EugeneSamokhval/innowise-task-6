<script>
export default {
  props: ['popupMessage', 'messageType'],
  data() {
    return { visible: false }
  },
  methods: {
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
    <div class="popup-message">
      <slot name="default"> </slot>
      <button @click="closePopup()" class="popup-message-close-button">Close</button>
    </div>
  </div>
</template>
<style scoped>
.popup-message-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-message {
  background: #fff2e3;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 500px;
  height: 250px;
  color: #651e1e;
  text-align: center;
  font-size: 36px;
  align-content: center;
}
.popup-message-close-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  background: #f65151;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #fff2e3;
}
</style>
