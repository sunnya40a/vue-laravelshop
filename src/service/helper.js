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
    userData.tokenreftime = null
    cryptoService.saveData(userData, 'userindex')
  }
  authStore.setUsername('')
  authStore.setAuthorized(false)
  authStore.setToken('')
  authStore.setTokenreftime(0)
  localStorage.removeItem('userindex', 'True')
}

export function filterString(inputValue) {
  // Remove unwanted characters and replace multiple spaces with single space
  inputValue = inputValue
    .replace(/[^\s\w\-()!,.[]]/g, '') // Remove unwanted characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
  return inputValue
}

export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    year: 'numeric',
    month: 'short'
  })
}

export function formatCurrency(value) {
  return `Rs ${parseFloat(value).toFixed(2)}`
}
