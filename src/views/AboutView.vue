<template>
  <div>
    <p>Payment entry</p>
    <div class="icon-container">
      <RiHeartFill class="my-icon heart-icon" />
      <RiHome5Fill class="my-icon home-icon" />
    </div>
  </div>
</template>

<script setup>
import { RiHeartFill, RiHome5Fill } from '@remixicon/vue'
</script>

<style lang="scss" scoped>
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Adjust height as needed
}

.my-icon {
  margin: 0 10px; // Add spacing between icons if needed
}

.heart-icon {
  color: blue;
  width: 64px; // Set width
  height: 64px; // Set height
}

.home-icon {
  color: red;
  width: 32px; // Set width
  height: 32px; // Set height
}

.facebook-icon,
.hot-icon {
  font-size: 48px; // Adjust the size as needed
  color: green; // Example color, change as needed
}
</style>
