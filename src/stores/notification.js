import { ref } from 'vue'
import { defineStore } from 'pinia'

let nextId = 0

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])

  const addNotification = (message, type = 'info') => {
    const id = nextId++
    notifications.value.push({ id, message, type })
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter((notification) => notification.id !== id)
  }

  return { notifications, addNotification, removeNotification }
})
