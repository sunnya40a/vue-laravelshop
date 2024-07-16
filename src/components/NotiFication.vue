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
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
}

.notification {
  padding: 1.5rem;
  border-radius: 1.7rem;
  /*box-shadow: 0 .2rem 1rem rgba(0, 0, 0, 0.5); */
  box-shadow: 0.4rem 0.4rem 1rem rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  font-size: 1.3rem;
  /*font-weight: bold;*/
  transition: opacity 0.3s ease;
}

.notification.info {
  background-color: #2196f3;
}

.notification.success {
  background-color: #4caf50;
}

.notification.warning {
  background-color: #e6e943;
  color: #f44336;
  font-weight: bolder;
}

.notification.login {
  background-color: #4caf50;
  font-weight: bolder;
}

.notification.error {
  background-color: #f44336;
  font-weight: bolder;
}
</style>
