<template>
  <div v-if="isLoggingOut" class="centered-message">Logging out...</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { LocalCleanup } from '@/service/helper'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const router = useRouter()
const isLoggingOut = ref(false)
const authstore = useAuthStore()
const siteurl = import.meta.env.VITE_API_URL

// Get the CSRF token from the meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

const logout = async () => {
  try {
    isLoggingOut.value = true
    const response = await axios.post(
      `${siteurl}/api/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authstore.token, // Use the stored token
          'X-CSRF-TOKEN': csrfToken // Include the CSRF token
        },
        withCredentials: true // Include credentials (cookies)
      }
    )

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Assuming successful logout if the response is OK
    LocalCleanup()
    // Redirect to the login page
    await router.push({ name: 'Login' })
  } catch (error) {
    console.error('An error occurred during logout:', error)
    // Handle logout failure
  } finally {
    isLoggingOut.value = false
  }
}

onMounted(() => {
  logout()
})
</script>

<style lang="scss" scoped>
.centered-message {
  /* Center the message horizontally and vertically */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Add additional styling if needed */
}
</style>
