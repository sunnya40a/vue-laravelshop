import { useAuthStore } from '@/stores/auth'
import { cryptoService } from '@/service/security'

export function LocalCleanup() {
  const userData = cryptoService.getUser()
  const authStore = useAuthStore()
  if (userData) {
    // Check if `userData` has value
    userData.authorized = false
    userData.user = null
    userData.token = null //
    cryptoService.saveData(userData, 'userindex')
  }
  authStore.setUsername('')
  authStore.setAuthorized(false)
  authStore.setToken('')
  localStorage.removeItem('userindex', 'True')
}

export function filterString(inputValue) {
  // Remove unwanted characters and replace multiple spaces with single space
  inputValue = inputValue
    .replace(/[^\s\w\-()!,.[]]/g, '') // Remove unwanted characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
  return inputValue
}