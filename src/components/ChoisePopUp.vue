<script>
export default {
  props: ['popupMessage'],
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
    acceptHandler() {
      this.$emit('accepted', true)
      this.visible = false
    },
  },
}
</script>
<template>
  <div class="popup-message-overlay" v-if="visible">
    <div class="popup-message">
      <slot name="default"> </slot>
      <button @click="acceptHandler" class="popup-message-accept-button">Accept</button>
      <button @click="closePopup" class="popup-message-close-button">Close</button>
    </div>
  </div>
</template>
<style scoped lang="css">
.popup-message-accept-button {
  position: absolute;
  bottom: 10px;
  right: 100px;
  width: 80px;
  height: 30px;
  border: none;
  background: #d4fdab;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #651e1e;
}
</style>
