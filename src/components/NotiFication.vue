<template>
  <div class="notification-container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :class="notification.type"
      @click="removeNotification(notification.id)"
    >
      <p>{{ notification.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)

const removeNotification = (id) => {
  notificationStore.removeNotification(id)
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.notification {
  padding: 15px;
  border-radius: 17px;
  /*box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); */
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  /*font-weight: bold;*/
  transition: opacity 0.3s ease;
}

.notification.info {
  background-color: #2196f3;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
  font-weight: bolder;
}
</style>
