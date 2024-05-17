import { useNotificationStore } from '@/stores/notification'

const useNotification = () => {
  const notificationStore = useNotificationStore()

  const notify = (message, type = 'info') => {
    notificationStore.addNotification(message, type)
  }

  return { notify }
}

export default useNotification
