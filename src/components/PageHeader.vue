<template>
  <div class="page-header">
    <div class="header-content">
      <span class="material-icons header-icon">{{ icon }}</span>
      <h1 class="header-title">{{ title }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Define props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

// Create refs for the props
const title = ref(props.title)
const icon = ref(props.icon)

// Watch for prop changes and update refs accordingly
watch(
  () => props.title,
  (newTitle) => {
    title.value = newTitle
  }
)

watch(
  () => props.icon,
  (newIcon) => {
    icon.value = newIcon
  }
)
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.page-header {
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #a8d3a2; /* Light background color */
  padding: 20px 70px;
  border-radius: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin-bottom: 10px;
}
.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.header-icon {
  font-size: 36px; /* Adjust the size as needed */
  margin-right: 10px;
  color: #007bff; /* Icon color */
}

.header-title {
  font-size: 24px; /* Adjust the size as needed */
  color: #333;
  flex-grow: 1;
  text-align: left;
  color: #007bff; /* Title color */
}
</style>
