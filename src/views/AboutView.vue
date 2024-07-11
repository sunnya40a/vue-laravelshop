<template>
  <div>
    <div class="icon-container">
      <p>Remix Icon</p>
      <RiHeartFill class="my-icon heart-icon" />
      <RiHome5Fill class="my-icon home-icon" />
    </div>
    <div class="icon-example">
      <p>Phosphor Icon</p>
      <PhCaretDown />
    </div>
  </div>
</template>

<script setup>
import { RiHeartFill, RiHome5Fill } from '@remixicon/vue'
import { PhCaretDown } from '@phosphor-icons/vue'
</script>

<style lang="scss" scoped>
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Adjust height as needed */
  flex-direction: column; /* Align text and icons vertically */
}

.my-icon {
  margin: 0 10px; /* Add spacing between icons if needed */
}

.icon-example {
  display: flex;
  flex-direction: column; /* Align text and icon vertically */
  justify-content: center;
  align-items: center;
  font-size: 24px; /* Adjust the size as needed */
  color: green; /* Adjust the color as needed */
  height: 50vh; /* Adjust the height as needed */
}

.heart-icon {
  color: blue;
  width: 64px; /* Set width */
  height: 64px; /* Set height */
}

.home-icon {
  color: red;
  width: 32px; /* Set width */
  height: 32px; /* Set height */
}
</style>
