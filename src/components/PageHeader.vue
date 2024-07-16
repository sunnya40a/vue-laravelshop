<template>
  <div class="page-header">
    <div class="header-content">
      <component :is="icon" class="header-icon" />
      <h1 class="header-title">{{ title }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, markRaw } from 'vue'

// Define props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: Object, // Component for Remix icons
    required: true
  }
})

// Create refs for the props
const title = ref(props.title)
const icon = markRaw(props.icon)

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
    icon.value = markRaw(newIcon)
  }
)
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #a8d3a2; // Light background color
  padding: 1rem 7rem;
  border-radius: 0;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1); // Subtle shadow
  margin-bottom: 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 40rem;
}

.header-icon {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  color: #007bff; // Icon color
}

.header-title {
  font-size: 2.4rem; // Adjust the size as needed
  color: #007bff; // Title color
  flex-grow: 1;
  text-align: left;
}
</style>
