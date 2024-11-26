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
<style></style>
