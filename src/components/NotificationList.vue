<template>
  <div class="notification-list">
    <NotiFication
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
    />
  </div>
</template>

<script setup>
import { useNotification } from '@/service/notificationService'
import NotiFication from '@/components/NotiFication.vue'

const { notifications } = useNotification()
</script>

<style scoped>
.notification-list {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
}
</style>
