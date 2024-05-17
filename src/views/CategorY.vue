<template>
  <main id="Home-page">
    <h1>Category Entry</h1>
    <p>This is the Category Entry page</p>
    <form @submit.prevent="submitForm">
      <!-- Your form fields -->
      <button type="submit">Submit</button>
    </form>
  </main>
</template>

<script setup>
import useNotification from '@/service/notificationService'
const { notify } = useNotification()

const submitForm = () => {
  // Simulating form submission or any action
  // Example: You can call an API here and handle the response
  // For demonstration purposes, we'll directly update the notification
  notify('Form submitted successfully!Form submitted successfully!', 'error')
}
</script>
